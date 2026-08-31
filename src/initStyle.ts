export const sheets:any = {}
const lightStyle = document.createElement('style')
lightStyle.id = "colorSchemeLight"
const darkStyle = document.createElement('style')
darkStyle.id = "colorSchemeDark"
const customStyle = document.createElement('style')
customStyle.id = "colorSchemeCustom"
document.head.appendChild(lightStyle)
document.head.appendChild(darkStyle)

const exportLightStyle = document.createElement('style')
exportLightStyle.id = "snippetCSS-colorSchemeLight"
const exportDarkStyle = document.createElement('style')
exportDarkStyle.id = "snippetCSS-colorSchemeDark"
document.head.appendChild(exportLightStyle)
document.head.appendChild(exportDarkStyle)
sheets["light"] =  lightStyle.sheet
sheets["dark"] = darkStyle.sheet
sheets["custom"] = ()=>{return customStyle.sheet}
sheets["customInject"] = (Dom:HTMLElement)=>{
    Dom.appendChild(customStyle)
    return customStyle
}