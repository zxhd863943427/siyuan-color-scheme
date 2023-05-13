export const sheets:any = {}
const lightStyle = document.createElement('style')
lightStyle.id = "colorSchemeLight"
const darkStyle = document.createElement('style')
darkStyle.id = "colorSchemeDark"
const customStyle = document.createElement('style')
customStyle.id = "colorSchemeCustom"
document.head.appendChild(lightStyle)
document.head.appendChild(darkStyle)
sheets["light"] =  lightStyle.sheet
sheets["dark"] = darkStyle.sheet
sheets["custom"] = ()=>{return customStyle.sheet}
sheets["customInject"] = (Dom:HTMLElement)=>{
    Dom.appendChild(customStyle)
    return customStyle
}