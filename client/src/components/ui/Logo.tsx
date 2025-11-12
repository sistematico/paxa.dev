import { animate, createScope, spring } from 'animejs';
import { useEffect, useRef } from 'react';
import reactLogo from '../../assets/images/logo.svg';

export default function Logo() {
  const root = useRef(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  // const [ rotations, setRotations ] = useState(0);

  useEffect(() => {
    scope.current = createScope({ root }).add(_ => {
    
      // Every anime.js instance declared here is now scoped to <div ref={root}>

      // Created a bounce animation loop
      animate('.logo', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: spring({ bounce: .7 }) }
        ],
        loop: true,
        loopDelay: 250,
      });
      
      // // Make the logo draggable around its center
      // createDraggable('.logo', {
      //   container: [0, 0, 0, 0],
      //   releaseEase: spring({ bounce: .7 })
      // });



    });

    // Properly cleanup all anime.js instances declared inside the scope
    return () => {
      if (scope.current) {
        scope.current.revert();
      }
    }

  }, []);

  // const handleClick = () => {
  //   setRotations(prev => {
  //     const newRotations = prev + 1;
  //     // Animate logo rotation on click using the method declared inside the scope
  //     if (scope.current?.methods && typeof scope.current.methods.rotateLogo === 'function') {
  //       scope.current.methods.rotateLogo(newRotations);
  //     }
  //     return newRotations;
  //   });
  // };

  return (
    <div ref={root}>
      <img src={reactLogo} className="logo" alt="Paxá" width={40} height={40} />
    </div>
  )
}
