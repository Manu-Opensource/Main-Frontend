//Simple XML parser.
//Supports xml like so
//<MyElement attribute="asdfasdf">
//  <Child/>
//  Some Text
//</MyElement>
export default function parseXml(xmlString) {
    xmlString = xmlString.trim();
    let index = 0;
    let stack = [];
    stack.push({children: [], attributes: []});
    while (index < xmlString.length) {
        if (xmlString[index] === '<' && (index === 0 || xmlString[index - 1] !== '\\')) {
            index++;
            let isClosing = xmlString[index] === '/'
            let name = "";
            if (isClosing) index++;
            while (xmlString[index] !== '>' && xmlString[index-1] !== '\\') {
                name += xmlString[index];
                index++;
            }
            index++;
            if (isClosing) {
                let obj = stack.pop();
                stack[stack.length - 1].children.push(obj);
            } else {
                if (name[name.length - 1] === '/') {
                    isClosing = true
                    name = name.substring(0, name.length - 1);
                }
                let split = name.split(/(\w+=)/);
                let attrs = {};
                for (let i = 1; i < split.length; i += 2) {
                    attrs[split[i].split("=")[0]] = split[i + 1].trim().substring(1, split[i + 1].trim().length - 1);
                }
                let obj = {
                    name: split[0].trim(),
                    children: [],
                    attributes: attrs,
                }
                if (isClosing) stack[stack.length - 1].children.push(obj);
                else stack.push(obj);
            }
        } else {
            let str = "";
            while (!(xmlString[index] === '<' && xmlString[index-1] !== '\\'))  {
                if (xmlString[index-1] == '\\')
                    str = str.substring(0, str.length - 1);
                str += xmlString[index];
                index++;
            }
            if (str.replace(/\s/g,'').length > 0)
                stack[stack.length - 1].children.push(str);
        }
    }
    return stack[0].children[0];
}

