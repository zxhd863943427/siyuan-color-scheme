// 接口
// searchSheet(sheet, regx)=>rule
// //返回对应的自定义样式规则
// exportSheetText(sheet)=>string
// //返回样式表的css内容
// exportSheet(sheet)=>sheetDict
// //导出样式表的dict
// importSheet(sheet, sheetDict)=>sheet
// //使用保存的内容初始化样式表
// getRuleValue(rule,name)=>value
// //返回样式规则包含的值
// setRuleValue(rule, item, value)=>rule
// //使用value设置rule中的item，并返回rule
// importRule(rule,dict)=>rule
// //使用样式规则dict设置Rule
// exporRule(rule)=>dict
// //返回样式规则包含的值



function foreach(obj: any, func: Function) {
    Array.from(obj).forEach(function (item) {
        func(item)
    });
}

function foreachDict(obj: any, func: Function) {
    let dictKeys = Object.keys(obj)
    Array.from(dictKeys).forEach((key) => {
        func(key, obj[key])
    })
}


const rootElement = document.querySelector(":root")
const computedStyles = window.getComputedStyle(rootElement);
export function getStyleByName(name: string) {
    let re = /(font|pdf)-(\w+)/
    let match = re.exec(name)
    let styleName = `--b3-${match[1]}-${match[2]}`
    return computedStyles.getPropertyValue(styleName)
}



export function searchSheet(sheet: CSSStyleSheet, re: RegExp) {
    let tempCssRules = sheet.cssRules
    let tempRule
    foreach(tempCssRules, (item: CSSStyleRule) => {
        let slector = item.selectorText
        if (re.exec(slector) != null) {
            tempRule = item
        }
    })
    return tempRule
}

export function exportSheetText(sheet: CSSStyleSheet) {
    let tempCssRules = sheet.cssRules
    let cssText: any = []
    foreach(tempCssRules, (item: CSSStyleRule) => {
        cssText.push(item.cssText)
    })
    return cssText.join("\n")
}

function getRuleValue(rule: CSSStyleRule, item: string) {
    return rule.style.getPropertyValue(item)
}

function setRuleValue(rule: CSSStyleRule, item: string, value: string) {
    rule.style.setProperty(item, value, "important")
    return rule
}

function exportRule(rule: CSSStyleRule) {
    let cssDict: any = {}
    foreach(rule.style, (item: any) => {
        let value = getRuleValue(rule, item)
        cssDict[item] = value
    })
    return cssDict
}

function importRule(rule: CSSStyleRule, cssDict: any) {
    rule.style.cssText = ""
    let dictKeys = Object.keys(cssDict)
    foreach(dictKeys, (item: any) => {
        setRuleValue(rule, item, cssDict[item])
    })
    return rule
}



function cssDictToStr(cssDict: any, item: string, mode: string) {
    let selectorText = genSelector(item,mode)
    let DomStr = []
    DomStr.push(selectorText + "{")
    foreachDict(cssDict, (item: any, value: any) => {
        DomStr.push(`${item}:${value} !important;`)
    })
    DomStr.push("}")
    return DomStr.join("\n")
}

function genSelector(itemStr: string,mode:string) {
    let DomStr = ""
    let fontColorRe = /font-color/
    let fontBackgroundRe = /font-background/
    let pdfBackgroundRe = /pdf-background/
    let baseMode = `:root[data-theme-mode=\"${mode}\"] `
    if (fontColorRe.exec(itemStr)) {
        DomStr = `[style*="color"][style*="var(--b3-${itemStr})"]`
    }
    else if (fontBackgroundRe.exec(itemStr)) {
        DomStr = `[style*="background-color"][style*="var(--b3-${itemStr})"]`
    }
    else if (pdfBackgroundRe.exec(itemStr)) {
        DomStr = `[style*="background-color"][style*="var(--b3-${itemStr})"]`
    }
    else {
        console.log("未知解析选项！")
        return ""
    }
    return baseMode + DomStr
}

export function domToItemStr(DomStr: string) {
    let re = /var\(--b3-(font|pdf)-(\w+)\)/
    let match = re.exec(DomStr)
    if (match === null) {
        console.log("未能解析Dom！")
        return ""
    }
    return `${match[1]}-${match[2]}`
}



export function exportSheet(sheet: CSSStyleSheet) {
    let cssSheets = sheet.cssRules
    let sheetDict: any = {}
    foreach(cssSheets, (rule: CSSStyleRule) => {
        let itemStr = domToItemStr(rule.selectorText)
        let itemValue = exportRule(rule)
        sheetDict[itemStr] = itemValue
    })
    return sheetDict
}

export function importSheet(sheet: CSSStyleSheet, sheetDict: any, mode = "light") {
    let cssLength = sheet.cssRules.length
    for (var i = 0; i < cssLength; i++) {
        sheet.deleteRule(0)
    }
    foreachDict(sheetDict, (item: string, value: string) => {
        let cssStr = cssDictToStr(value, item, mode)
        sheet.insertRule(cssStr, 0)
    })
    return sheet
}

// 测试函数

function testImport(Sheet: CSSStyleSheet) {
    let tempRule = searchSheet(Sheet, /12/)
    console.log(tempRule)
    let tempDict = exportRule(tempRule)
    console.log(tempDict)
    let backRule = importRule(tempRule, tempDict)
    console.log(backRule.style)
}

function testGen(strList: any) {
    let tempItem: any = []
    let tempDom: any = []
    foreach(strList, (item: any) => {
        tempItem.push(domToItemStr(item))
    })
    console.log(tempItem)
    foreach(tempItem, (item: any) => {
        tempDom.push(genSelector(item,"light"))
    })
    console.log(tempDom)
}

function testSheetImport(sheet: CSSStyleSheet) {
    let tempCssDict = exportSheet(sheet)
    importSheet(sheet, tempCssDict)
}