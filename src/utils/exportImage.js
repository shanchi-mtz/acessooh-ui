// Copia (ou baixa se o Clipboard não permitir) o <svg> que estiver dentro da div com id nodeId
export async function copySvgNodeAsPNG(nodeId, { scale = 2, fileName = 'grafico.png' } = {}) {
  const node = document.getElementById(nodeId);
  if (!node) return;

  const svg = node.querySelector('svg');
  if (!svg) return;

  const rect = svg.getBoundingClientRect();
  const xml = new XMLSerializer().serializeToString(svg);
  const svg64 = btoa(unescape(encodeURIComponent(xml)));
  const image64 = 'data:image/svg+xml;base64,' + svg64;

  const img = new Image();
  return new Promise((resolve) => {
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, rect.width * scale);
      canvas.height = Math.max(1, rect.height * scale);
      const ctx = canvas.getContext('2d', { alpha: true });
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);

      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })]);
          resolve('copied');
        } catch {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = fileName;
          a.click();
          resolve('downloaded');
        }
      }, 'image/png');
    };
    img.src = image64;
  });
}
