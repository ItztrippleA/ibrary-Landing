export type AccessPrefs = {
  zoom: number;
  contrast: boolean;
};

export const defaultPrefs: AccessPrefs = {
  zoom: 100,
  contrast: false,
};

export const zoomMin = 80;
export const zoomMax = 200;
export const zoomStep = 10;

const storageKey = 'ibrary-access';

export function clampZoom(value: number) {
  const stepped = Math.round(value / zoomStep) * zoomStep;
  return Math.min(zoomMax, Math.max(zoomMin, stepped));
}

export function readPrefs(): AccessPrefs {
  if (typeof window === 'undefined') return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as { zoom?: number; text?: number; contrast?: boolean };
    let zoom = defaultPrefs.zoom;
    if (typeof parsed.zoom === 'number' && Number.isFinite(parsed.zoom)) zoom = clampZoom(parsed.zoom);
    else if (parsed.text === 1) zoom = 110;
    else if (parsed.text === 2) zoom = 130;
    else if (parsed.text === 3) zoom = 150;
    return { zoom, contrast: Boolean(parsed.contrast) };
  } catch {
    return defaultPrefs;
  }
}

export function applyPrefs(prefs: AccessPrefs) {
  const root = document.documentElement;
  const zoom = clampZoom(prefs.zoom);
  if (zoom === 100) root.style.fontSize = '';
  else root.style.fontSize = `${zoom}%`;
  if (prefs.contrast) root.dataset.contrast = 'on';
  else delete root.dataset.contrast;
  delete root.dataset.text;
  delete root.dataset.readable;
  delete root.dataset.links;
  delete root.dataset.spacing;
  delete root.dataset.motion;
}

export function savePrefs(prefs: AccessPrefs) {
  const next = { zoom: clampZoom(prefs.zoom), contrast: prefs.contrast };
  applyPrefs(next);
  window.localStorage.setItem(storageKey, JSON.stringify(next));
}
