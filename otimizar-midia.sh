#!/bin/zsh
# Gera as versões leves (web) dos vídeos e fotos a partir dos originais.
#   Originais (alta qualidade): ~/Documents/LORDS-midia-original/{videos,fotos,estudio}
#   Saída (vai para o site):   assets/videos e assets/fotos
# Vídeo: MP4 H.264 (abre em qualquer celular, inclusive Android), carregamento rápido.
#   hero: 720p, até 15s (VSLs inteiras) · portfolio: 540p, até 10s
# Foto: JPG com no máximo 1400px no lado maior.
# Uso: ./otimizar-midia.sh   (só converte o que ainda não existe; depois rode node sync-midia.mjs)
set -u
cd "$(dirname "$0")"
ORIG="$HOME/Documents/LORDS-midia-original"
VSL_INTEIRA=(reel-lucas-0 sequencia-01-1)

converter() {
  local src="$1" dst="$2" preset="$3" dur="$4"
  [[ -f "$dst" ]] && return
  mkdir -p "$(dirname "$dst")"
  if [[ -n "$dur" ]]; then
    avconvert -s "$src" -p "$preset" -o "$dst" --replace --duration "$dur" >/dev/null 2>&1
  else
    avconvert -s "$src" -p "$preset" -o "$dst" --replace >/dev/null 2>&1
  fi
  [[ -f "$dst" ]] && echo "✓ ${dst#assets/}" || echo "✗ falhou: $src"
}

find "$ORIG/videos" -type f \( -iname '*.mp4' -o -iname '*.mov' -o -iname '*.m4v' \) | sort | while read -r src; do
  rel="${src#$ORIG/videos/}"
  base="${${rel:t}:r}"
  dst="assets/videos/${rel:h}/${base}.mp4"
  if [[ "$rel" == hero/* ]]; then
    if (( ${VSL_INTEIRA[(Ie)$base]} )); then converter "$src" "$dst" Preset1280x720 ""
    else converter "$src" "$dst" Preset1280x720 15; fi
  else
    converter "$src" "$dst" Preset960x540 10
  fi
done

find "$ORIG/fotos" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | sort | while read -r src; do
  dst="assets/fotos/${src:t}"
  [[ -f "$dst" && "$dst" -nt "$src" && $(stat -f%z "$dst") -lt 900000 ]] && continue
  cp "$src" "$dst"
  sips -Z 1400 -s formatOptions 78 "$dst" >/dev/null 2>&1 && echo "✓ fotos/${src:t}"
done
# Estúdio: vídeos 540p até 10s + fotos 1400px
find "$ORIG/estudio" -maxdepth 1 -type f | sort | while read -r src; do
  case "${src:e:l}" in
    mp4|mov|m4v) converter "$src" "assets/estudio/${${src:t}:r}.mp4" Preset960x540 10 ;;
    jpg|jpeg|png)
      dst="assets/estudio/${src:t}"; [[ -f "$dst" ]] && continue
      cp "$src" "$dst"; sips -Z 1400 -s formatOptions 78 "$dst" >/dev/null 2>&1 && echo "✓ estudio/${src:t}" ;;
  esac
done
cp "$ORIG/videos/LEIA-ME.txt" assets/videos/ 2>/dev/null
echo "Pronto. Agora: node sync-midia.mjs"
