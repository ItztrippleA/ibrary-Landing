export type AccessPrefs = {
  text: 0 | 1 | 2 | 3;
  contrast: boolean;
  readable: boolean;
  links: boolean;
  spacing: boolean;
  motion: boolean;
};

export const defaultPrefs: AccessPrefs = {
  text: 0,
  contrast: false,
  readable: false,
  links: false,
  spacing: false,
  motion: false,
};

export const textLabels = ['Default', 'Large', 'Larger', 'Largest'] as const;

const storageKey = 'ibrary-access';

export function readPrefs(): AccessPrefs {
  if (typeof window === 'undefined') return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as Partial<AccessPrefs>;
    const text = parsed.text;
    return {
      text: text === 1 || text === 2 || text === 3 ? text : 0,
      contrast: Boolean(parsed.contrast),
      readable: Boolean(parsed.readable),
      links: Boolean(parsed.links),
      spacing: Boolean(parsed.spacing),
      motion: Boolean(parsed.motion),
    };
  } catch {
    return defaultPrefs;
  }
}

export function applyPrefs(prefs: AccessPrefs) {
  const root = document.documentElement;
  if (prefs.text === 0) delete root.dataset.text;
  else root.dataset.text = String(prefs.text);
  setFlag(root, 'contrast', prefs.contrast);
  setFlag(root, 'readable', prefs.readable);
  setFlag(root, 'links', prefs.links);
  setFlag(root, 'spacing', prefs.spacing);
  if (prefs.motion) root.dataset.motion = 'off';
  else delete root.dataset.motion;
}

export function savePrefs(prefs: AccessPrefs) {
  applyPrefs(prefs);
  window.localStorage.setItem(storageKey, JSON.stringify(prefs));
}

function setFlag(root: HTMLElement, name: string, on: boolean) {
  if (on) root.dataset[name] = 'on';
  else delete root.dataset[name];
}
