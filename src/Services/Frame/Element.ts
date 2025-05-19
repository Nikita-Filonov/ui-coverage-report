import { useEffect } from 'react';
import { blue, green, orange, purple, red } from '@mui/material/colors';
import { hexToRGBA } from '../Core';
import { SelectorType } from '../../Models/Selector';
import { Color } from '../../Models/Core';
import { AgentSettings } from '../../Models/Agent';

type GetElementProps = {
  type: SelectorType;
  value: string;
};

export type VisualElement = HTMLElement | SVGElement;

const isVisualElement = (node: Element | null): node is VisualElement => {
  return node instanceof HTMLElement || node instanceof SVGElement;
};

const getElementByXpath = (selector: string): XPathResult => {
  return document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
};

export const getElement = ({ type, value }: GetElementProps): VisualElement | null => {
  let node: Element | null = null;

  switch (type) {
    case SelectorType.CSS: {
      node = document.querySelector(value);
      break;
    }
    case SelectorType.XPath: {
      const result = getElementByXpath(value);
      node = result.singleNodeValue instanceof Element ? result.singleNodeValue : null;
      break;
    }
    default:
      return null;
  }

  return isVisualElement(node) ? node : null;
};

const MAP_COLOR_TO_BORDER_COLOR: Record<Color, string> = {
  [Color.Info]: blue['300'],
  [Color.Error]: red['700'],
  [Color.Primary]: blue['700'],
  [Color.Success]: green['500'],
  [Color.Warning]: orange['300'],
  [Color.Secondary]: purple['500']
};

export const useElement = (props: GetElementProps & { settings?: AgentSettings }) => {
  const { type, value, settings } = props;
  const node = getElement({ type, value });

  const highlightElement = (el: VisualElement) => {
    const color = MAP_COLOR_TO_BORDER_COLOR[settings?.overlayColor || Color.Primary];

    el.style.outline = `1px solid ${color}`;
    el.style.backgroundColor = hexToRGBA(color, 0.1);
  };

  const clearHighlight = (el: VisualElement) => {
    el.style.outline = '';
    el.style.backgroundColor = '';
  };

  useEffect(() => {
    if (!node) return;

    highlightElement(node);

    return () => {
      clearHighlight(node);
    };
  }, [node, settings?.overlayColor]);

  return { node };
};
