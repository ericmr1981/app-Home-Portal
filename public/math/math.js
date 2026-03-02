(function () {
  const $ = (id) => document.getElementById(id);
  const radius = $('radius');
  const radiusNum = $('radiusNum');
  const slices = $('slices');
  const slicesNum = $('slicesNum');
  const t = $('t');
  const play = $('play');
  const pause = $('pause');

  const piOut = $('pi');
  const rOut = $('rOut');
  const aOut = $('aOut');

  const canvas = $('canvas');
  const ctx = canvas.getContext('2d');

  let playing = false;
  let raf = null;

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function syncNumberInputs() {
    radiusNum.value = String(radius.value);
    slicesNum.value = String(slices.value);
  }

  function syncRangeInputs() {
    radius.value = String(radiusNum.value);
    slices.value = String(slicesNum.value);
  }

  function fmt(n) {
    return Math.round(n * 10) / 10;
  }

  function updateKPIs() {
    const r = Number(radius.value);
    const A = Math.PI * r * r;
    piOut.textContent = Math.PI.toFixed(4);
    rOut.textContent = String(r);
    aOut.textContent = String(fmt(A));
  }

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const r = Number(radius.value);
    const n = Math.max(6, Number(slices.value));
    const progress = Number(t.value);

    // Layout
    const leftCenter = { x: w * 0.25, y: h * 0.52 };
    const rightCenter = { x: w * 0.72, y: h * 0.55 };

    // Draw labels
    ctx.fillStyle = '#64748b';
    ctx.font = '14px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial';
    ctx.fillText('圆形切分', leftCenter.x - 36, 26);
    ctx.fillText('交错拼接（近似长方形）', rightCenter.x - 84, 26);

    // Helper to draw a sector
    function sectorPath(cx, cy, a0, a1, rr) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, rr, a0, a1);
      ctx.closePath();
    }

    // Left: circle sectors
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2;
      const a1 = ((i + 1) / n) * Math.PI * 2;
      const hue = (i * 360) / n;
      sectorPath(leftCenter.x, leftCenter.y, a0, a1, r);
      ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.85)`;
      ctx.fill();
      ctx.strokeStyle = 'rgba(30,41,59,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Right: show an approximate rectangle of width ~ pi*r and height r
    const rectW = Math.PI * r;
    const rectH = r;
    const maxRectW = w * 0.45;
    const scale = rectW > maxRectW ? maxRectW / rectW : 1;
    const rw = rectW * scale;
    const rh = rectH * scale;

    const rx = rightCenter.x - rw / 2;
    const ry = rightCenter.y - rh / 2;

    // Border
    ctx.strokeStyle = 'rgba(30,41,59,0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, ry, rw, rh);

    // Fill with strips representing slices pairs
    const stripCount = n / 2;
    for (let i = 0; i < stripCount; i++) {
      const hue = (i * 360) / stripCount;
      const sw = rw / stripCount;
      const x = rx + i * sw;
      ctx.fillStyle = `hsla(${hue}, 85%, 62%, ${0.30 + 0.45 * progress})`;
      ctx.fillRect(x, ry, sw, rh);
    }

    // Annotate width and height
    ctx.fillStyle = '#0f172a';
    ctx.font = '16px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial';
    ctx.fillText('宽 ≈ πr', rx + rw / 2 - 26, ry - 10);
    ctx.fillText('高 = r', rx - 52, ry + rh / 2 + 6);

    // Show a morph hint by drawing a faint arc length on top
    ctx.globalAlpha = 0.25 + 0.55 * (1 - progress);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(leftCenter.x, leftCenter.y, r, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Explanation text
    ctx.fillStyle = '#334155';
    ctx.font = '14px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial';
    ctx.fillText('当 n 变大时，拼接更像长方形 → 宽接近半周长(πr)', rightCenter.x - 160, h - 18);
  }

  function tick() {
    if (playing) {
      const v = Number(t.value);
      const next = v + 0.01;
      t.value = String(next >= 1 ? 1 : next);
      if (next >= 1) playing = false;
    }
    updateKPIs();
    draw();
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  // Wire events
  radius.addEventListener('input', () => {
    syncNumberInputs();
  });
  radiusNum.addEventListener('input', () => {
    radiusNum.value = String(clamp(Number(radiusNum.value || 0), 1, 500));
    syncRangeInputs();
  });

  slices.addEventListener('input', () => {
    syncNumberInputs();
  });
  slicesNum.addEventListener('input', () => {
    let v = Number(slicesNum.value || 6);
    if (v % 2 !== 0) v += 1;
    slicesNum.value = String(clamp(v, 6, 200));
    syncRangeInputs();
  });

  t.addEventListener('input', () => {
    // manual scrub
    playing = false;
  });

  play.addEventListener('click', () => {
    playing = true;
  });
  pause.addEventListener('click', () => {
    playing = false;
  });

  syncNumberInputs();
  updateKPIs();
  start();
})();
