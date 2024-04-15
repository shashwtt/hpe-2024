
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

  /*=====================================EFFECTS PAGE=================================== */

let sections = gsap.utils.toArray(".horizontalScrollDiv");

let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".effectsPageContainer",
      pin: true,
      scrub: 0.5,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=3000"
    }
  });


  let thingsMove1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".effectPageFirst",
      start: "top top",
      end: "250% top",
      scrub: 1,
      // markers:true,
    },
  });
  
  thingsMove1
    // .to(".octMove1", { x: "-10vw",y:"-10vh", rotation:-30, duration: 1 },'runOct')
    .to(".octMove1", { x: "-45vw",y:"-20vh", duration: 1 })


 
    // let thingsMove2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".effectPageSecond",
    //     start: "100% top",
    //     end: "250% top",
    //     scrub: 1,
    //     // markers:true,
    //   },
    // });
    
    // thingsMove2
    //   .to(".octMove2", { x:"-50vh", duration: 1 })
    //   .to(".octMove2", { x: "-30vw",y:"20vh", duration: 1 })    



      let thingsMove3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".effectPageThird",
          start: "300% top",
          end: "450% top",
          scrub: 1,
          // markers:true,
        },
      });
      
      thingsMove3
        .to(".octMove3", { x:"-40vh", duration: 1 }) 


        let colorChange = gsap.timeline({
          scrollTrigger: {
            trigger: ".effectPageFirst",
            start: "top top",
            end: "400% top",
            scrub: 1,
            markers:true,
          },
        });
        
        colorChange 
          .to(".effectsPageContainer", { background:'#004d80', duration:2}) 
          .to(".effectsPageContainer", { background:'#2aa22a', duration: 2 }) 
          .to(".effectsPageContainer", { background:'#990000', duration: 2 }) 
          .to(".effectsPageContainer", { background:'#86592d', duration: 2 }) 
    

    
          // gsap.to(".effectsPageContainer",
          // {scrollTrigger:{
          // trigger:".effectPageFirst",
          //   start:"40% top",
          //   scrub:0.3,
          //   markers:true,
          //   end:"60% top",
          //   // pin:true,
          //   toggleActions:"restart pause resume pause"},
          //   background:'#004d80',
          //   duration:0.1})

          //   gsap.to(".effectsPageContainer",
          //   {scrollTrigger:{
          //   trigger:".effectPageSecond",
          //     start:"140% top",
          //     scrub:0.3,
          //     markers:true,
          //     end:"200% top",
          //     // pin:true,
          //     toggleActions:"restart pause resume pause"},
          //     background:'#2aa22a',
          //     duration:0.1})


          //     gsap.to(".effectsPageContainer",
          //     {scrollTrigger:{
          //     trigger:".effectPageThird",
          //       start:"240% top",
          //       scrub:0.3,
          //       markers:true,
          //       end:"300% top",
          //       // pin:true,
          //       toggleActions:"restart pause resume pause"},
          //       background:'#990000',
          //       duration:0.1})


          //       gsap.to(".effectsPageContainer",
          //       {scrollTrigger:{
          //       trigger:".effectPageThird",
          //         start:"340% top",
          //         scrub:0.3,
          //         markers:true,
          //         end:"400% top",
          //         // pin:true,
          //         toggleActions:"restart pause resume pause"},
          //         background:'#86592d',
          //         duration:0.1})