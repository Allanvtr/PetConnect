import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface BaseProps {
  size?: number;
  color?: string;
  stroke?: number;
  /** Com `label` o ícone vira uma imagem acessível; sem ele fica oculto para leitores de tela. */
  label?: string;
  style?: StyleProp<ViewStyle>;
  fill?: string;
}

interface FrameProps extends BaseProps {
  children: ReactNode;
}

function Frame({ size = 22, color = '#1F2328', stroke = 1.8, label, style, fill = 'none', children }: FrameProps) {
  const a11y = label
    ? ({ accessible: true, accessibilityRole: 'image', accessibilityLabel: label } as const)
    : ({ accessible: false, importantForAccessibility: 'no-hide-descendants' } as const);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...a11y}
    >
      {children}
    </Svg>
  );
}

export type IconProps = BaseProps;

export const IconBack = (p: IconProps) => (
  <Frame size={24} stroke={2} color="#1F2328" {...p}>
    <Path d="M15 5l-7 7 7 7" />
  </Frame>
);

export const IconChevronRight = (p: IconProps) => (
  <Frame size={20} stroke={2} color="#5B6168" {...p}>
    <Path d="M9 5l7 7-7 7" />
  </Frame>
);

export const IconChevronDown = (p: IconProps) => (
  <Frame size={20} stroke={2} color="#5B6168" {...p}>
    <Path d="M5 9l7 7 7-7" />
  </Frame>
);

export const IconSearch = (p: IconProps) => (
  <Frame size={20} color="#5B6168" {...p}>
    <Circle cx="11" cy="11" r="7" />
    <Path d="M20 20l-4-4" />
  </Frame>
);

export const IconPin = (p: IconProps) => (
  <Frame size={18} color="#1F2328" {...p}>
    <Path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
    <Circle cx="12" cy="10" r="2.5" />
  </Frame>
);

/** Marcador do mapa (alfinete preenchido). */
export const IconPinSolid = (p: IconProps) => (
  <Frame size={36} stroke={1.5} color="#FFFFFF" fill="#2F4B73" {...p}>
    <Path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
    <Circle cx="12" cy="10" r="2.5" fill="#FFFFFF" />
  </Frame>
);

/** Selo de ONG verificada (escudo com check). */
export const IconVerified = ({ label = 'ONG verificada', ...p }: IconProps) => (
  <Frame size={14} stroke={2} color="#2F4B73" label={label || undefined} {...p}>
    <Path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <Path d="M9 12l2 2 4-4" />
  </Frame>
);

export const IconHome = (p: IconProps) => (
  <Frame {...p}>
    <Path d="M3 11l9-8 9 8" />
    <Path d="M5 10v10h14V10" />
  </Frame>
);

export const IconDoc = (p: IconProps) => (
  <Frame {...p}>
    <Path d="M6 3h9l4 4v14H6z" />
    <Path d="M9 12h7M9 16h7" />
  </Frame>
);

export const IconChat = (p: IconProps) => (
  <Frame {...p}>
    <Path d="M4 5h16v11H9l-5 4z" />
  </Frame>
);

export const IconUser = (p: IconProps) => (
  <Frame {...p}>
    <Circle cx="12" cy="8" r="4" />
    <Path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </Frame>
);

export const IconGrid = (p: IconProps) => (
  <Frame {...p}>
    <Rect x="4" y="4" width="7" height="7" rx="1" />
    <Rect x="13" y="4" width="7" height="7" rx="1" />
    <Rect x="4" y="13" width="7" height="7" rx="1" />
    <Rect x="13" y="13" width="7" height="7" rx="1" />
  </Frame>
);

export const IconPaw = (p: IconProps) => (
  <Frame {...p}>
    <Circle cx="6" cy="10" r="1.8" />
    <Circle cx="10" cy="6" r="1.8" />
    <Circle cx="14" cy="6" r="1.8" />
    <Circle cx="18" cy="10" r="1.8" />
    <Path d="M8 18c0-3 2-5 4-5s4 2 4 5c0 1.5-1.5 2-4 2s-4-.5-4-2z" />
  </Frame>
);

export const IconPeople = (p: IconProps) => (
  <Frame {...p}>
    <Circle cx="9" cy="8" r="3.5" />
    <Path d="M2.5 20c0-3.5 2.8-6 6.5-6s6.5 2.5 6.5 6" />
    <Path d="M16 5a3.5 3.5 0 010 7M18 14c2.2.7 3.5 2.7 3.5 6" />
  </Frame>
);

export const IconPlus = (p: IconProps) => (
  <Frame size={20} stroke={2.2} {...p}>
    <Path d="M12 5v14M5 12h14" />
  </Frame>
);

export const IconPencil = (p: IconProps) => (
  <Frame size={20} color="#2F4B73" {...p}>
    <Path d="M4 20l1-4L16 5l3 3L8 19z" />
    <Path d="M14 7l3 3" />
  </Frame>
);

export const IconCopy = (p: IconProps) => (
  <Frame size={20} color="#2F4B73" {...p}>
    <Rect x="9" y="9" width="11" height="11" rx="2" />
    <Path d="M5 15V6a2 2 0 012-2h9" />
  </Frame>
);

export const IconPhone = (p: IconProps) => (
  <Frame size={20} color="#2F4B73" {...p}>
    <Path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </Frame>
);

export const IconCheck = (p: IconProps) => (
  <Frame size={14} stroke={3.5} color="#FFFFFF" {...p}>
    <Path d="M5 12l5 5 9-10" />
  </Frame>
);

export const IconCheckCircle = (p: IconProps) => (
  <Frame size={20} stroke={2.2} color="#2F4B73" {...p}>
    <Circle cx="12" cy="12" r="9" />
    <Path d="M8 12l3 3 5-6" />
  </Frame>
);

export const IconSend = (p: IconProps) => (
  <Frame size={20} stroke={2} color="#FFFFFF" {...p}>
    <Path d="M4 12l16-8-6 16-3-7z" />
  </Frame>
);
