import { Plugin, showMessage, confirm, Dialog, Menu, isMobile, openTab } from "siyuan";
import "./index.scss";
import "./color.scss";
import {  domToItemStr, getStyleByName, exportSheetText, exportSheet, importSheet } from "./sheetSetting"
import { sheets } from "./initStyle"
import { getMode, createPickr } from "./utils"


const STORAGE_NAME = "menu-config";

interface MyObject {
    [key: string]: string;
}
const defaultConfig = {
    colorSchemeStyleId: 'color-scheme-plugin',
    currentLight: 'default',
    currentDark: 'default',
    lightSchemes: {
        'default': '系统默认',
    },
    darkSchemes: {
        'default': '系统默认',
    },
}

export default class PluginColorScheme extends Plugin {

    config = defaultConfig;

    onload() {
        console.log(this.i18n.helloPlugin);
        this.addContext();
        this.loadConfig();
        this.loadCustomData();


        const topBarElement = this.addTopBar({
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path d="M19.2277 18.7321L20.9955 16.9644L22.7632 18.7321C23.7395 19.7084 23.7395 21.2914 22.7632 22.2677C21.7869 23.244 20.204 23.244 19.2277 22.2677C18.2514 21.2914 18.2514 19.7084 19.2277 18.7321ZM8.87861 1.07959L20.1923 12.3933C20.5828 12.7838 20.5828 13.417 20.1923 13.8075L11.707 22.2928C11.3165 22.6833 10.6833 22.6833 10.2928 22.2928L1.80754 13.8075C1.41702 13.417 1.41702 12.7838 1.80754 12.3933L9.58572 4.61512L7.4644 2.4938L8.87861 1.07959ZM10.9999 6.02934L3.92886 13.1004L10.9999 20.1715L18.071 13.1004L10.9999 6.02934Z"></path></svg>`,
            title: this.i18n.addTopBarIcon,
            position: "right",
            callback: () => {
                this.addMenu(topBarElement.getBoundingClientRect());
            }
        });

    }

    onunload() {
        console.log(this.i18n.byePlugin);
    }

    openSetting() {
        const lightSchemes :MyObject = this.config.lightSchemes
        const lightOptions:Array<string> = Object.keys(this.config.lightSchemes);

        const darkSchemes :MyObject = this.config.darkSchemes
        const darkOptions:Array<string> = Object.keys(this.config.darkSchemes);
        const dialog = new Dialog({
            title: this.name,
            content: `<div class="config__tab-container" data-name="common" style="height: unset !important;">
            <label class="fn__flex b3-label config__item">
                <div class="fn__flex-1">
                    ${this.i18n.choseLightScheme}
                    <div class="b3-label__text">${this.i18n.lightScheme}</div>
                </div> 
                <span class="fn__space"></span>
                <select class="b3-select fn__flex-center fn__size200" id="light-schemes-current">
                    ${lightOptions.map((o) => `<option value="${o}">${lightSchemes[o]}</option>`).join('\n')}
                </select>
            </label>
            <label class="fn__flex b3-label config__item">
                <div class="fn__flex-1">
                    ${this.i18n.choseDarkScheme}
                    <div class="b3-label__text">${this.i18n.darkScheme}</div>
                </div> 
                <span class="fn__space"></span>
                <select class="b3-select fn__flex-center fn__size200" id="dark-schemes-current">
                    ${darkOptions.map((o) => `<option value="${o}">${darkSchemes[o]}</option>`).join('\n')}
                </select>
            </label>
            <label class="fn__flex b3-label config__item">
                <div class="fn__flex-1">
                    上传配色方案
                    <div class="b3-label__text">导入社区提供的配色方案</div>
                </div>
                <span class="fn__space"></span>
                <button class="b3-button b3-button--outline fn__flex-center fn__size200" id="color-schemes-upload-button">
                    点击上传
                    <input class="b3-file fn__flex-center" type="file" id="color-schemes-file" style="display:none"/>
                    </button>
            </label>
        </div>`,
            width: isMobile() ? "92vw" : "520px",
        });
        const uploadButton = dialog.element.querySelector('#color-schemes-upload-button');

        const selectLight:HTMLSelectElement = dialog.element.querySelector('#light-schemes-current');
        selectLight.value = this.config.currentLight;
        selectLight.addEventListener('change', (e) => {
            let target:any =  e.target
            const selected = target.value;
            this.applyScheme(selected,"light");
        });
        const selectDark:HTMLSelectElement = dialog.element.querySelector('#dark-schemes-current');
        selectDark.value = this.config.currentDark;
        selectDark.addEventListener('change', (e) => {
            let target:any =  e.target
            const selected = target.value;
            this.applyScheme(selected,"dark");
        });

        const file:HTMLInputElement = dialog.element.querySelector('#color-schemes-file');
        uploadButton.addEventListener('click', () => {
            file.click();
        });
        file.addEventListener('change', async (e) => {
            // console.log("file change")
            let fileElement:HTMLInputElement = dialog.element.querySelector('#color-schemes-file');
            let file = fileElement.files[0];
            await this.upload(file);

            // this.updateSelect();
        });
    }

    private async updateSelect() {
        let newOptionsHTML;
        // light
        const lightSelect = document.querySelector('#light-schemes-current');
        const lightSchemes: MyObject = this.config.lightSchemes;
        const lightOptions: Array<string> = Object.keys(this.config.lightSchemes);
        newOptionsHTML = lightOptions.map((o) => `<option value="${o}">${lightSchemes[o]}</option>`).join('\n');
        lightSelect.innerHTML = newOptionsHTML;

        //dark
        const darkSelect = document.querySelector('#dark-schemes-current');
        const darkSchemes: MyObject = this.config.darkSchemes;
        const darkOptions: Array<string> = Object.keys(this.config.darkSchemes);
        newOptionsHTML = darkOptions.map((o) => `<option value="${o}">${darkSchemes[o]}</option>`).join('\n');
        darkSelect.innerHTML = newOptionsHTML;
    }


    private async addContext() {
        let that = this
        document.addEventListener("contextmenu", function (event) {
            var target: any = event.target;
            if (target.className === "color__square") {
                let currentSheet = sheets[getMode()]
                // 确定字体颜色还是背景
                let colorStyle = target.style.cssText
                let StyleName = domToItemStr(colorStyle)
                // console.log(StyleName)
                const menu = document.createElement('div')
                menu.id = "pickrMenuItem"

                // 注入自定义样式
                let cssDict = getStyleByName(StyleName,currentSheet)
                let sheetDict = {"font-color27":cssDict}
                // console.log(sheetDict)
                let pickrRoot = createPickr(menu, StyleName, that)
                let cumstomSheet = sheets["customInject"](pickrRoot)
                
                // console.log(menu)
                let menuObj = new Menu('ColorSchemePlugin')
                let html = menuObj.addItem({ id:"pickrMenu" })
                let container = html.parentElement
                container.innerHTML = ""
                container.append(menu)
                
                if (isMobile()) {
                    menuObj.fullscreen();
                } else {
                    menuObj.open({
                        x: event.clientX,
                        y: event.clientY,
                        isLeft: true,
                    });
                }

                
                importSheet(cumstomSheet.sheet,sheetDict,"none")
            }
        })
    }
    
    async saveCustomData(){
        let light = exportSheet(sheets["light"])
        let dark = exportSheet(sheets["dark"])
        let CustomData = {
            name:"custom",
            light:light,
            dark:dark
        }
        this.saveData("custom.json",JSON.stringify(CustomData,(any,item)=>{return item},"\t"))
    }

    async loadCustomData(){
        let CustomData = await this.loadData("custom.json")
        if (CustomData === "" || CustomData === undefined || CustomData === null){
            this.saveCustomData()
            return
        }
        importSheet(sheets["light"],CustomData["light"])
        importSheet(sheets["dark"],CustomData["dark"])
    }

    async applyScheme(selected:string,mode:string){
        console.log(selected)
        // 如果是default就清空当前设置
        if (selected == "default"){
            switch(mode){
                case "light":
                    importSheet(sheets["light"],{});
                    this.config["currentLight"] = selected;
                    break;
                case "dark":
                    importSheet(sheets["dark"],{});
                    this.config["currentDark"] = selected;
                    break;
            }
            this.saveCustomData()
            this.saveConfig()
            return
        }
        let CustomData = await this.loadData(`${selected}.json`)
        
        switch(mode){
            case "light":
                importSheet(sheets["light"],CustomData["light"]);
                this.config["currentLight"] = selected;
                break;
            case "dark":
                importSheet(sheets["dark"],CustomData["dark"]);
                this.config["currentDark"] = selected;
                break;
        }
        this.saveConfig()
        this.saveCustomData()
        return
    }
    async upload(file:any) {
        return new Promise<void>((resolve) => {
            let reader = new FileReader();
            reader.addEventListener('load', async (e) => {
                // console.log("start load file")
                let text:any = e.target.result;
                let scheme;
                try {
                    scheme = JSON.parse(text);
                } catch (e) {
                    // new Notification({ type: 'error', message: 'Scheme parse failed' }).show();
                    showMessage("Scheme parse failed",6000,'error');
                    return;
                }
                const name = scheme.name;
                if (!name) {
                    // new Notification({ type: 'error', message: '配色方案无名称' }).show();
                    showMessage("配色方案无名称",6000,'error');
                    return;
                }
                if (name === 'config') {
                    // new Notification({ type: 'error', message: '配色方案名称不能叫config' }).show();
                    showMessage("配色方案名称不能叫config",6000,'error');
                    return;
                }
                if(scheme.light === undefined && scheme.dark === undefined){
                    showMessage("配色方案格式不正确，缺乏 light、dark字段",6000,'error');
                    return
                }
                this.saveData(`${name}.json`,JSON.stringify(scheme,(any,item)=>{return item},"\t"))
                // this.saveScheme(name, schemes);
                // new Notification({ type: 'info', message: `配色方案${name}上传成功` }).show();
                showMessage(`配色方案${name}上传成功`,6000,'info');
                await this.updateConfig(scheme)
                // if (name === this.config.current) {
                //     this.applyScheme(name);
                // }
            });
            reader.readAsText(file);
            resolve();
        });

    }

    async updateConfig(scheme:any){
        let name:string = scheme.name
        if (scheme["light"]!=undefined){
            // const lightSchemes :MyObject = this.config.lightSchemes
            this.config.lightSchemes[name] = name
        }
        if (scheme["light"]!=undefined){
            // const darkSchemes :MyObject = this.config.darkSchemes
            this.config.lightSchemes[name] = name
        }
        this.updateSelect();
        this.saveConfig();
    }

    private saveConfig(){
        this.saveData("config.json",JSON.stringify(this.config,(any,item)=>{return item},"\t"))
    }
    private async loadConfig(){
        let config = await this.loadData("config.json")
        if (config === null || config === "" || config === undefined){
            this.saveConfig()
            return
        }
        this.config = config;
    }

    private async addMenu(rect: DOMRect) {
        if (!this.data) {
            await this.loadData(STORAGE_NAME);
        }

        const menu = new Menu("topBarSample", () => {
            console.log(this.i18n.byeMenu);
        });
        menu.addItem({
            label: this.i18n.exportCurrentScheme,
            click: ()=>{
                let light = exportSheet(sheets["light"])
                let dark = exportSheet(sheets["dark"])
                let exportData = {
                    name:"export",
                    light:light,
                    dark:dark
                }
                this.saveData("export.json",JSON.stringify(exportData,(any,item)=>{return item},"\t"))
                showMessage(this.i18n.exportSchemeSuccess)
            }
        });
        menu.addItem({
            label: this.i18n.exportCurrentCss,
            click: () => {
                let lightCss = exportSheetText(sheets["light"])
                let darkCss = exportSheetText(sheets["dark"])
                let allCss = `           
/* light scheme */
${lightCss}
/* light scheme */


/* dark scheme */
${darkCss}
/* dark scheme */
                `
                this.saveData("export.css",allCss)
                showMessage(this.i18n.exportCssSuccess)
            }
        });
        menu.addItem({
            label: this.i18n.resetScheme,
            click: () => {
                this.applyScheme("default",getMode());
            }
        });
        menu.addItem({
            label: this.i18n.openSetting,
            click: () => {
                this.openSetting()
            }
        });
        if (isMobile()) {
            menu.fullscreen();
        } else {
            menu.open({
                x: rect.right,
                y: rect.bottom,
                isLeft: true,
            });
        }
    }
}
