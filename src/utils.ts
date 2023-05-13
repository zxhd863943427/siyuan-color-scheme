import Pickr from '@simonwep/pickr';
import { pickrNanoCss } from "./assets/css"
import { getColorByName, getStyleByName, exportSheet, importSheet } from "./sheetSetting"
import { sheets } from "./initStyle"

export function getMode(){
    return document.querySelector("html").getAttribute("data-theme-mode")
}

export function createPickr(element:HTMLElement, StyleName:string, plugin:any) {
    const id = 'color-scheme-plugin'
    let currentSheet = sheets[getMode()]
    let currentColor = getColorByName(StyleName, currentSheet)
    let cssDict = getStyleByName(StyleName,currentSheet)

    currentColor = currentColor ? currentColor.trim() : null;
    console.log(currentColor)
    element.attachShadow({ mode: "open" });
    
    element.shadowRoot.innerHTML = `
        <style>
        ${pickrNanoCss}
        .pickrCheck div{
            border-radius: 4px;
        }
                </style>
                <div style="display:flex;align-items: center">
                <span class="pickr"></span>
                <span style="background-color:var(--b3-font-color27);margin:0px 4px;font-size:1.1em;">
                ${plugin.i18n.showText}
                </span>
                </div>
                <div style="margin:10px 0px"><textarea class="b3-text-field fn__block" >${JSON.stringify(cssDict,(any,item)=>{return item},"\n")}</textarea></div>
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
    pickrInit.on("save", (color:any) => {
        let colorValue = color ? color.toHEXA().toString() : "";

        window.tempColor = color;
        console.log(colorValue)
    });
    return element.shadowRoot;
}