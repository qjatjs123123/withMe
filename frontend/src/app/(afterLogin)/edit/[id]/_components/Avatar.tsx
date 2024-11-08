import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './Avatars.module.css';

type BothProps = {
  variant?: 'avatar' | 'more';
  size?: number;
  outlineColor?: string;
  outlineWidth?: number;
  borderRadius?: number;
  className?: string;
  style?: Record<string, string>;
};

type PictureProps = BothProps & {
  variant?: 'avatar';
  name?: string;
  src?: string;
  statusColor?: string;
  count?: never;
};

type MoreProps = BothProps & {
  variant: 'more';
  count: number;
  src?: never;
  name?: never;
  statusColor?: never;
};

type AvatarProps = PictureProps | MoreProps;

const AvatarWithTooltip = ({
  variant = 'avatar',
  src = '',
  name = '1',
  size = 52,
  statusColor = '',
  outlineColor = '',
  outlineWidth = 3,
  borderRadius = 9999,
  className = '',
  style = {},
  count = 0,
}: AvatarProps) => {
  const innerVariant = variant === 'avatar' && !src ? 'letter' : variant;
  const realSize = size - outlineWidth * 2;

  return (
    <div className="group inline-block">
      <div
        style={{
          height: realSize,
          width: realSize,
          boxShadow: `${outlineColor} 0 0 0 ${outlineWidth}px`,
          margin: outlineWidth,
          borderRadius,
          ...style,
        }}
        className={classNames(styles.avatar, className)}
      >
        {innerVariant === 'more' ? <MoreCircle count={count} borderRadius={borderRadius} /> : null}

        {innerVariant === 'avatar' ? (
          <PictureCircle name={name} src={src} size={realSize} borderRadius={borderRadius} />
        ) : null}
        {statusColor ? <span style={{ backgroundColor: statusColor }} className={styles.status} /> : null}
      </div>
    </div>
  );
};

const PictureCircle = ({
  name,
  src = '',
  size,
  borderRadius,
}: Pick<PictureProps, 'name' | 'src' | 'size' | 'borderRadius'>) => {
  return (
    <div className="relative">
      <Image alt={name ?? ''} src={src} height={size} width={size} style={{ borderRadius }} />
      <div className="absolute opacity-0 group-hover:opacity-100 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};

const MoreCircle = ({ count, borderRadius }: Pick<MoreProps, 'count' | 'borderRadius'>) => {
  return (
    <div style={{ borderRadius }} className={styles.more}>
      +{count}
    </div>
  );
};

export default AvatarWithTooltip;
