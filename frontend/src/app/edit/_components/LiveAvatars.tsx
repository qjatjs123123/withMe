import React from 'react';
import Avatar from './Avatar';
import { useOthersMapped, useSelf } from '@liveblocks/react';
import { AnimatePresence, motion } from 'framer-motion';

const MAX_OTHERS = 3;

const animationProps = {
  initial: { width: 0, transformOrigin: 'left' },
  animate: { width: 'auto', height: 'auto' },
  exit: { width: 0 },
  transition: {
    type: 'spring',
    damping: 15,
    mass: 1,
    stiffness: 200,
    restSpeed: 0.01,
  },
};

const avatarProps = {
  style: { marginLeft: '-0.45rem' },
  size: 48,
};

export default function LiveAvatars() {
  const others = useOthersMapped((other) => other.info);
  const currentUser = useSelf();
  const hasMoreUsers = others.length > MAX_OTHERS;

  return (
    <div className="relative">
      <div
        style={{
          height: '48px',
          display: 'flex',
          paddingLeft: '0.75rem',
        }}
      >
        <AnimatePresence>
          {hasMoreUsers ? (
            <motion.div key="count" {...animationProps}>
              <Avatar {...avatarProps} variant="more" count={others.length - 3} />
            </motion.div>
          ) : null}

          {others
            .slice(0, MAX_OTHERS)
            .reverse()
            .map(([key, info]) => (
              <motion.div key={key} {...animationProps}>
                <Avatar {...avatarProps} src={info?.avatar_url} name={info?.name} />
              </motion.div>
            ))}

          {currentUser ? (
            <motion.div key="you" {...animationProps}>
              <Avatar {...avatarProps} src={currentUser.info?.avatar_url} name={currentUser.info?.name + ' (you)'} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
