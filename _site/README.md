# axchristie.github.io

Personal academic website for Alex Christie, Ph.D. Designed from scratch with three.js.

## Design Philosphy

This website was designed based on the philosophy that unexpected changes in an element's state should drive navigation. The splash animation is a wireframe 3D plane displaced by Perlin noise (glsl care of Stefan Gustavson); however, it transforms into a sticky header once the user selects a menu option. Scrolling back up reverts the shader and title state from header back to splash. Page elements include a mix of three.js text meshes and html elements, blurring the distinction between the canvas and the DOM. For instance, the h2 banner is the same colour as the root background and is therefore only visible because the shader's z-position sits between them (notice how the banner disappears into the background as the shader animates). 

The stack and design philosophy for this website emerge from my ongoing research in 3D data visualization for the Humanities. The wireframe shader gestures toward my investment in meshes as embodiments of data; the blend of DOM and canvas enacts my interest in moving beyond text as the primary mode of knowledge output in Humanities research. See Projects and Publications to learn more about these ideas.

## Structure

    index.html
    css/style.css
    js/script.js
    js/splash/
        Experience.js
        Camera.js
        Renderer.js
        CustomUniforms.js
        Debug.js
        interaction/
            Mouse.js
            DOMEvents.js
        utils/
            Sizes.js
            Time.js
        world/
            World.js
            Shader.js
            Title.js
            Menu.js
            MagicBackground.js

## Dependencies

three.js r158, lil-gui, and GSAP, loaded via importmap from the jspm CDN. Fonts are three.js `typeface.json` conversions of Helvetiker.

## Credits and AI code review

This website was designed and coded by myself, with AI assistance in the final stages of deployment. The Experience/singleton architecture, as well as the use of custom uniforms to drive shader injection, is taken from Bruno Simon's Three.js Journey, with Perlin noise glsl care of Stefan Gustavson.

Claude Opus 5.0 was used in the late stages of development to make the website fully responsive and to conduct a final code review. I initially hard coded the three.js mesh positioning based on the landscape aspect ratio in which I developed the site; this was not suitable for mobile orientations. Claude wrote a getVisibleExtents Camera helper that positions meshes based on their z-distance from the camera; combined with a layout function for each mesh, this constitutes a responsive mesh positioning system that iterates upon my hard coded first pass. Claude also assisted in generating responsive css to make the site fully-suitable for mobile devices. I provided a boilerplate flexbox structure, which I then iterated upon through a multi-turn session with Claude Opus 5.0; resulting in the "sections" portion of the site as it exists now.

The development arc for this project involved coding and designing the site for desktop myself, but deliberately leaving the work of responsive design to Claude. Before deploying, I also asked Claude to conduct a final code review, as this website is a solo endeavour: edge cases were minimal.
