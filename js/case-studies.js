// ===========================================================
// CASE STUDIES
// Each entry is one project. Add here, no HTML changes needed
// beyond the card's data-case-study="id" attribute.
// ===========================================================
export const caseStudies = {
  papercut: {
    title: "Papercut",
    media: [
      { type: "video", src: "assets/papercut-trailer.mp4" },
      {
        type: "image",
        src: "assets/papercut-cover.png",
      },
      { type: "image", src: "assets/papercut-screenshot1.png" },
      { type: "image", src: "assets/papercut-screenshot2.png" },
      { type: "image", src: "assets/papercut-screenshot3.png" },
      { type: "image", src: "assets/papercut-screenshot4.png" },
      { type: "image", src: "assets/papercut-screenshot5.png" },
      { type: "image", src: "assets/papercut-screenshot6.png" },
      { type: "image", src: "assets/papercut-loadingScene-background1.png" },
      { type: "image", src: "assets/papercut-loadingScene-background2.png" },
      { type: "image", src: "assets/papercut-loadingScene-background3.png" },
      { type: "video", src: "assets/papercut-1.mp4" },
      { type: "video", src: "assets/papercut-2.mp4" },
      { type: "video", src: "assets/papercut-3.mp4" },
    ],
    meta: ["Unity", "2026", "Gameplay Programmer", "UI Programmer"],
    tags: ["Unity", "3D", "Bullet Hell", "Action", "Slash-n-dash"],
    description: `A 3D over-the-shoulder slash-&-dash bullet hell where Little Susie, a 7-year-old princess-loving girl, is sucked into a demonic realm made entirely of paper origami. She shreds through paper demons with her giant enchanted scissors in a world of ballistic movement and procedural chaos.`,
    caseStudy: {
      problem: `During the early stages of the production of Papercut, one of the problems I was facing was the face generation algorithm to cover the holes inside the procedurally generated meshes. The faces that were being generated were often having gaps or generating unwanted artifacts. The algorithm I was using at that time is called Fan Triangulation, which consists of choosing the first found vertex and connecting it to every other vertex in the polygon to generate a face in run time. The problem is that this algorithm only works for convex polygons and usually a good percentage of the meshes used in games nowadays are non-convex.`,
      decision: `To fix this problem, I had to either keep trying to refine the Fan Triangulation algorithm or go for a different approach. Because this is such an unexplored and experimental feature, if I found no solution for this problem, this would be one of the features that would get cut out of the project's scope.

Doing some research, I found out about Ear Clipping, a different polygon triangulation algorithm that is less performant than Fan triangulating, by a considerate amount. But, with this new algorithm, I could refine the Fan Triangulation without completely scraping it and achieving a better result visually. Because there was no direct comparison of Fan Triangulation against Ear Clipping, I initially tried asking Technical and 3D artists about 3D modelling softwares (Maya and Blender) on how they cleaned the faces of their 3D models. From that, I learned that Blender is open source, so I started digging through how they dealt with that. With my research, I discovered that there were no other simpler ways of fixing my problem in an optimized way.

So, I started prototyping the new algorithm and learned that it was exactly the result I wanted for the feature I was working on (procedural cuts) and there was space for optimizing, giving me both a good frame rate and stunning looks, with minimal occurrence of artifacts.`,
      result: `With that decision made, I could deliver a fully functional and performant system that achieved exactly what the designers were expecting from the procedural cuts. One thing that didn't work well was the time it took to get this done. It took me approximately 2 to 3 weeks working on this feature, which I could have been more certain and instead of doing the trial-and-error approach, I could have searched more and looked for more specialized guidance.

Currently, we are reaching an average of about 58~60 frames per second, 16ms, with barely any stutters during gameplay.

If I could work on this feature for an extra week, I would cover more edge cases regarding exotic 3D meshes, making sure that the algorithm works smoothly for any scenario.`,
    },
    team: [
      { name: "Joel van der Lee", role: "Project Manager, Level Designer, Narrative Director" },
      { name: "Vinicius Januzzi", role: "Gameplay Programmer, UI Programmer" },
      { name: "Paul Atwal", role: "Gameplay Designer, Tech Artist, Audio Implementation" },
      { name: "Kiran Wood", role: "Programmer, AI Programmer" },
      { name: "Diana Fernández", role: "UI, 2D Artist, Tech Artist" },
      { name: "Angelina Cole-Blais", role: "3D Artist" },
    ],
    playUrl: "https://vfs-gdpg.itch.io/papercut",
    playLabel: "Play on itch.io",
  },
  a22: {
    title: "A22 - Os Primeiros",
    media: [
      {
        type: "image",
        src: "https://img.itch.zone/aW1nLzE4MjU1NDQ3LnBuZw==/original/TvA%2BJt.png",
      },
      { type: "image", src: "assets/a22-screenshot1.png" },
      { type: "image", src: "assets/a22-screenshot2.png" },
    ],
    meta: ["Unity", "2024", "Programmer"],
    tags: ["Unity", "Puzzle", "Suspense", "Retro"],
    description: `Step into the shoes of a daring journalist as you investigate strange, eerie cases haunting a quiet coastal town. Each clue uncovers a deeper connection to the mysterious, leading you closer to an ancient, secretive organization. Your ultimate challenge: solve a cryptic puzzle and face the final test. Will you join their ranks or refuse, knowing either choice makes you The Fool? Discover the truth—or die trying.`,
    playUrl: "https://jhorro.itch.io/a22-osprimeiros",
    playLabel: "Play on itch.io",
  },
  bagre: {
    title: "Operacao Bagre Noturno",
    media: [
      {
        type: "image",
        src: "https://img.itch.zone/aW1nLzE2MjE1MTQzLnBuZw==/original/xoRlqg.png",
      },
      { type: "image", src: "assets/bagre-screenshot1.png" },
      { type: "image", src: "assets/bagre-screenshot2.png" },
      { type: "image", src: "assets/bagre-screenshot3.png" },
      { type: "image", src: "assets/bagre-screenshot4.png" },
      { type: "image", src: "assets/bagre-screenshot5.png" },
    ],
    meta: ["Unity", "2024", "Programmer / System Designer / OST"],
    tags: ["Unity", "Stealth", "PSX", "Comedy"],
    description: `In an alternative Brazil of 2031, the game puts players in the role of a special agent of the Brazilian Armed Forces, tasked with infiltration, espionage, and sabotage missions in international scenarios. Blending elements of stealth, action, and comedy, the game offers a unique experience across varied environments, highlighting Brazilian culture and setting. With a rich narrative and charismatic characters, the player must use a variety of skills and devices to overcome challenges while dealing with tense situations and moments of unexpected humor, guaranteeing an engaging and fun journey.`,
    playUrl: "https://jhorro.itch.io/operacao-bagre-noturno",
    playLabel: "Play on itch.io",
  },
};