//构建样式表
const customStyle = document.createElement('style')
customStyle.innerHTML = `
[style*="color:var(--b3-font-color1)"]{
    border-color: #fecfd1 !important;
    border-width: 1px 0px 1px 0px !important;
    border-style: solid !important;
    background-color: rgba(255, 167, 172, 0.6);
}

[style*="color: var(--b3-font-color1)"] {
    border-color: #fecfd1 !important;
    border-width: 4px 0px 4px 0px !important;
    border-style: solid !important;
    background-color: rgba(255, 167, 172, 0.6);
}
/* 2.波浪线 */
[style*="color:var(--b3-font-color2)"],
[style*="color: var(--b3-font-color2)"] {
   text-decoration: underline wavy;
}
/* 3.一级考点强调 */
[style*="color:var(--b3-font-color3)"],
[style*="color: var(--b3-font-color3)"] {
    border-bottom: 1px dashed var(--b3-font-color3);
}
/* 5.淡色备注 */
[style*="color:var(--b3-font-color5)"],
[style*="color: var(--b3-font-color5)"] {
  font-size: 90%;
}
/*6.IPA*/
[style*="color:var(--b3-font-color6)"],
[style*="color: var(--b3-font-color6)"] {
  font-family: "Times New Roman" !important;
}
/*7.楷体*/
[style*="color:var(--b3-font-color7)"],
[style*="color: var(--b3-font-color7)"] {
  font-family: "楷体" !important;
  font-size: 110%;
}
/*8.悠哉字体*/
[style*="color:var(--b3-font-color8)"],
[style*="color: var(--b3-font-color8)"] {
  font-family: "悠哉字体" !important;
}
/*9.手写体*/
[style*="color:var(--b3-font-color9)"],
[style*="color: var(--b3-font-color9)"] {
  font-family: "Aa漫语手写体（简繁）" !important;
}
/*10.大字库*/
[style*="color:var(--b3-font-color10)"],
[style*="color: var(--b3-font-color10)"] {
  font-family: "TH-Sung-TP2","TH-Sung-TP0" !important;
}
/*11.荧光笔*/
[style*="color:var(--b3-font-color11)"]{
       background: linear-gradient(104deg, rgba(255, 147, 166,0) 0.9%, rgba(255, 147, 166,1.25) 2.4%, rgba(255, 147, 166,0.5) 5.8%, rgba(255, 147, 166,0.1) 93%, rgba(255, 147, 166,0.7) 96%, rgba(255, 147, 166,0) 98%), linear-gradient(183deg, rgba(255, 147, 166,0) 0%, rgba(255, 147, 166,0.3) 7.9%, rgba(255, 147, 166,0) 15%);
       -webkit-box-decoration-break: clone;
}
[style*="color: var(--b3-font-color11)"] {
       background: linear-gradient(104deg, rgba(255, 147, 166,0) 0.9%, rgba(255, 147, 166,1.25) 2.4%, rgba(255, 147, 166,0.5) 5.8%, rgba(255, 147, 166,0.1) 93%, rgba(255, 147, 166,0.7) 96%, rgba(255, 147, 166,0) 98%), linear-gradient(183deg, rgba(255, 147, 166,0) 0%, rgba(255, 147, 166,0.3) 7.9%, rgba(255, 147, 166,0) 15%);
       padding: 0.2em 0.3em;
       -webkit-box-decoration-break: clone;
       margin: 0;
       border-radius: 7.5px;
       text-shadow: -12px 12px 9.8px rgba(255, 147, 166,0.7), 21px -18.1px 7.3px rgba(255, 255, 255,1), -18.1px -27.3px 30px rgba(255, 255, 255,1);
}
/*12.关键词*/
[style*="color:var(--b3-font-color12)"],
[style*="color: var(--b3-font-color12)"] {
    border-bottom: 3px dashed #eb8383;
}
/*13.填空*/
[style*="color:var(--b3-font-color13)"],
[style*="color: var(--b3-font-color13)"] {
    border-bottom: 3px dashed #7C505D;
}
/* 1.黑條 */
[style*="color: var(--b3-font-background1)"] {
  padding: 0.1em 0.3em;
}
[style*="color: var(--b3-font-background1)"]:hover {
  background-color: rgba(255, 255, 255, 0) !important;
}
/* 2.黑條 */
[style*="color: var(--b3-font-background2)"] {
  padding: 0.1em 0em;
}
[style*="color: var(--b3-font-background2)"]:hover {
  background-color: rgba(255, 255, 255, 0) !important;
}
/* 3.只適用於文字的方塊結構 */
[style*="color:var(--b3-font-background3)"]{
  background-color: rgba(255, 255, 255, 0);
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
}

[style*="color: var(--b3-font-background3)"] {
  background-color: rgba(255, 255, 255, 0);
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: inherit;
  cursor: pointer;
  padding: 0em 0.3em;
  display: inline-block;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
}
/* 4.圓框 */
[style*="color:var(--b3-font-background4)"]{
  background-color: rgba(255, 255, 255, 0);
  border: 2px solid var(--b3-theme-on-background);
  border-radius: 30px;
  box-shadow: 2px 2px 0 0 var(--b3-theme-on-background);
  cursor: pointer;
  display: inline-block;
}

[style*="color: var(--b3-font-background4)"] {
  background-color: rgba(255, 255, 255, 0);
  border: 2px solid;
  border-radius: 30px;
  box-shadow: 4px 4px 0 0;
  cursor: pointer;
  display: inline-block;
  padding: 0 0.3em;
}
/* 5.選中 */
[style*="color:var(--b3-font-background5)"],
[style*="color: var(--b3-font-background5)"] {
    border-color: #efdede !important;
    border-width: 1px 1px 1px 1px !important;
    border-style: 0px solid !important;
}
/* 6.粉色便利贴 */
[style*="color:var(--b3-font-background6)"]{
    border-color: #eabfc2 !important;
    border-width: 1px 1px 1px 1px !important;
    border-style: solid !important;
}

[style*="color: var(--b3-font-background6)"] {
    border-color: #eabfc2 !important;
    border-width: 12px 12px 0px 12px !important;
    border-style: solid !important;
    box-shadow: rgba(182, 149, 151, 0.25) 0px 14px 28px, rgba(182, 149, 151, 0.22) 0px 10px 10px, 1px 2px 2px 1px rgba(182, 149, 151, 0.6);
;
    font-size: 90%;
}
[style*="color:var(--b3-font-background7)"]{
    border-radius: 5px;
    border-color: #960064 !important;
    border-width: 1px 1px 1px 1px !important;
    border-style: solid !important;
}

[style*="color: var(--b3-font-background7)"] {
    border-radius: 5px;
    border-color: #960064 !important;
    border-width: 1px 1px 1px 1px !important;
    border-style: solid !important;
    margin-bottom: 6px;
    margin-top: 6px;
}
/* 8.框*/
[style*="color:var(--b3-font-background8)"]{
    border-radius: 5px;
    border-color: inherit;
    border-width: 1px 1px 1px 1px !important;
    border-style: dashed !important;
}
[style*="color: var(--b3-font-background8)"] {
    border-radius: 5px;
    border-color: inherit !important;
    border-width: 2px 2px 2px 2px !important;
    border-style: dashed !important;
    padding: 0em 0.3em 0em 0.3em;
}

[style*="color:var(--b3-font-background9)"]{
    border-radius: 5px;
    border-color: #edd9d2 !important;
    border-width: 1px 1px 1px 1px !important;
    border-style: solid !important;
}

[style*="color: var(--b3-font-background9)"] {
    border-radius: 5px;
    border-color: #edd9d2 !important;
    border-width: 1px 1px 1px 1px !important;
    border-style: solid !important;
    margin-bottom: 6px;
    margin-top: 6px;
}
`

document.head.appendChild(customStyle)
export const customSheet = customStyle.sheet