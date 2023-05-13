import Pickr from '@simonwep/pickr';
import { pickrNanoCss } from "./assets/css"
export function getMode(){
    return document.querySelector("html").getAttribute("data-theme-mode")
}

export function createPickr(element:HTMLElement, color:string) {
    const id = 'color-scheme-plugin'
    let currentColor = color
    console.log(currentColor)
    element.attachShadow({ mode: "open" });
    element.shadowRoot.innerHTML = `
        <style>
        ${pickrNanoCss}
        .pickrCheck div{
            border-radius: 4px;
        }
                </style>
                <span class="pickr"></span>
                <span class="pickrCheck"></span>

        
        `;
        let container:any = element.shadowRoot.querySelector(".pickrCheck")
        let pickrEl:any = element.shadowRoot.querySelector(".pickr")
    let pickrInit = Pickr.create({
        container: container,
        el: pickrEl,
        theme: 'monolith', // or 'monolith', or 'nano'
        default: currentColor,
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {

            // Main components
            preview: true,
            opacity: true,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                clear: false,
                save: true
            }
        }
    });
    let that = this;
    pickrInit.on("save", (color:any) => {
        let colorValue = color ? color.toHEXA() : "";

        window.tempColor = color;
        console.log(colorValue,color)
    });
    return pickrInit;
}