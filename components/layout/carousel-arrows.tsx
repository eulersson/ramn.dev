import { motion, useAnimationControls } from "framer-motion";

type CarouselArrowProps = {
  index: number;
  middle: number;
  isLeft: boolean;
  arrowChar: string;
};

function CarouselArrow({ index, middle, isLeft, arrowChar }: CarouselArrowProps) {
  const controls = useAnimationControls();
  
  // The arrows closer to the center are larger and bounce further when hovered.
  const distance = Math.abs(index - middle);

  const scale = distance === 0 ? 50 : Math.max(50 - (distance * 7), 15);
  const moveX = isLeft
    ? -30 - (3 - distance) * 30
    : 30 + (3 - distance) * 30;

  return (
    <motion.span
      className="mix-blend-difference"
      style={{ fontSize: `${scale}px` }}
      initial={{ x: isLeft ? -3 : 3, opacity: 0 }}
      whileInView={{
        x: isLeft ? -3 : 3,
        opacity: 1,
        transition: {
          opacity: { duration: 0.2 }
        }
      }}
      viewport={{ once: false }}
      animate={controls}
      onViewportEnter={() => {
        setTimeout(() => {
          controls.start({
            x: moveX,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }).then(() => {
            controls.start({
              x: isLeft ? -3 : 3,
              transition: {
                duration: 0.5,
                ease: "easeInOut"
              }
            });
          });
        }, index * 100 + 200);
      }}
      onHoverStart={() => {
        controls.start({
          x: moveX,
          transition: {
            duration: 0.3,
            ease: "easeOut"
          }
        }).then(() => {
          controls.start({
            x: isLeft ? -3 : 3,
            transition: {
              duration: 0.5,
              ease: "easeInOut"
            }
          });
        });
      }}
    >
      {arrowChar}
    </motion.span>
  );
}

type CarouselArrowsProps = {
  side: 'left' | 'right';
  onClick?: () => void;  // Optional callback for click events
};

/**
 * A component that renders a vertical stack of animated arrows for carousel navigation.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {'left' | 'right'} props.side - Determines whether the arrows point and animate left or right
 * @param {() => void} [props.onClick] - Optional callback function triggered when the arrows are clicked
 *
 * @remarks
 * The component creates 7 arrows with the middle arrow being the largest.
 * Each arrow animates outward on viewport entry and hover:
 * - Arrows closer to the center are larger and bounce further
 * - Animation timing is staggered for a wave effect
 * - Uses Framer Motion for animations
 * - Renders as an accessible button element
 * 
 * @example
 * ```tsx
 * <CarouselArrows 
 *   side="left" 
 *   onClick={() => handlePreviousSlide()} 
 * />
 * ```
 */
export function CarouselArrows({side, onClick} : CarouselArrowsProps) {
  const isLeft = side === 'left';
  const arrowChar = isLeft ? '❮' : '❯';
  const baseMarginClasses = isLeft
    ? '-ml-[10px] hover:-ml-[6px] active:-ml-[2px] -mt-[10px] hover:-mt-[6px] active:-mt-[2px]'
    : '-mr-[10px] hover:-mr-[6px] active:-mr-[2px] -mt-[10px] hover:-mt-[4px] active:-mt-[2px]';
  const alignmentClass = isLeft ? 'items-end pr-[10px]' : 'items-start pl-[10px]';

  const middle = Math.floor((7 - 1) / 2);

  return (
    <motion.button
      type="button"
      aria-label={`${isLeft ? 'Previous' : 'Next'} slide`}
      onClick={onClick}
      className={
        `w-g02n h-full transition ` +
        `text-back bg-fore hover:bg-back border-2-back ` +
        `flex flex-col -center ` + 
        `cursor-none hover:cursor-none` +
        baseMarginClasses + " " + 
        alignmentClass + " justify"
      }
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      {Array.from({ length: 7 }, (_, i) => (
        <CarouselArrow
          key={i}
          index={i}
          middle={middle}
          isLeft={isLeft}
          arrowChar={arrowChar}
        />
      ))}
    </motion.button>
  );
}

