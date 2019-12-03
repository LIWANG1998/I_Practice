let validateFieldOpt = {
    email: {
        rule: { reg: /^\w{2,}@\w{2,}\.[A-Za-z0-9]{2,}$/ },
        successMsg: "&nbsp;",
        errorMsg: "没有邮箱吗",
        selector: '#email'
    },
    tel: {
        rule: { reg: /^1[2-9]\d{9}$/ },
        successMsg: "&nbsp;",
        errorMsg: "电话号码格式不正确",
        selector: '#tel'
    },
    username: {
        rule: { reg: /^[a-zA-Z]\w{5}/ },
        successMsg: "&nbsp;",
        errorMsg: "用户名格式不正确",
        selector: '#username'
    },
    password1: {
        rule: { reg: /^.{6,20}$/ },
        successMsg: "&nbsp;",
        errorMsg: "密码长度为6-20位",
        selector: '#password1'
    },
    password2: {
        rule: { reg: /^.{6,20}$/, equal: 'password1' },
        successMsg: "&nbsp;",
        errorMsg: "两次密码不一样",
        selector: '#password2'
    }
}

//构造函数
function VerifyObject(VerifyObject_p) {
    //给个方法 拿到验证的元素对象
    this._getValiElt = (ValiElt_p) => {
        //初始化储存元素对象的字；
        this.valiElt = {};
        for (let key in ValiElt_p) {
            this.valiElt[key] = document.querySelector(ValiElt_p[key].selector);
        }
    }
    //调用函数
    this._getValiElt(VerifyObject_p);
    //给个方法 初始化验证结果
    this._initValiRes = (ValiRes_p) => {
        //初始化验证结果
        this.valiRes = {};
        for (let key in ValiRes_p) {
            this.valiRes[key] = false;
        }
        Object.defineProperty(this.valiRes, 'poss', {
            get: function () {
                let res = true;
                for (let key in this) {
                    res = res && this[key];
                    if (!res) { break }
                }
                return res;
            }
        })

    }
    //调用函数
    this._initValiRes(VerifyObject_p);
    //逐个验证
    this._eachVali = (value_p, reg_p) => {
        let d = reg_p.test(value_p);
        // console.log(value_p);
        // console.log(reg_p);
        // console.log(d);
        return d;
    }
    //循环验证
    this._cycleVali = (cycleVali_p) => {
        for (let key in this.valiElt) {
            //找到每个输入框
            let eltvali = this.valiElt[key];
            eltvali.onblur = () => {
                //找到每个输入框的value值
                let eltValue = eltvali.value;
                //获取到输入框对应的验证规则
                let eltReg = cycleVali_p[key].rule.reg;
                //调用逐个验证函数 赋值
                this.valiRes[key] = this._eachVali(eltValue, eltReg);
                this._styleChange(key, this.valiRes[key]);
            }
        }
    }
    this._cycleVali(VerifyObject_p);
    //验证完以后掉用函数 改变 对应的页面样式
    this._styleChange = (eltvaliID_p, valiRes_p) => {
        //找到每个输入框
        let curIpt = this.valiElt[eltvaliID_p];
        //找到每个输入框下面的span
        let infoSpan = curIpt.nextElementSibling;
        if (valiRes_p) {
            curIpt.parentElement.classList.add('has-success')
            curIpt.parentElement.classList.remove('has-error')
            // console.log(VerifyObject_p[eltvaliID_p].successMsg);
            infoSpan.innerHTML = VerifyObject_p[eltvaliID_p].successMsg
            // console.log(`${valiRes_p}验证成功`)
        } else {
            curIpt.parentElement.classList.remove('has-success')
            curIpt.parentElement.classList.add('has-error')
            // console.log(VerifyObject_p[eltvaliID_p].errorMsg)
            infoSpan.innerHTML = VerifyObject_p[eltvaliID_p].errorMsg
            // console.log(`${valiRes_p}验证失败`)
        }
    }

    //点击之后重新比配
    this.inspection = (inspection_P) => {
        for (let key in this.valiElt) {
            //找到每个输入框
            let eltvali = this.valiElt[key];
            //找到每个输入框的value值
            let eltValue = eltvali.value;
            //获取到输入框对应的验证规则
            let eltReg = inspection_P[key].rule.reg;
            //调用逐个验证函数 赋值
            this.valiRes[key] = this._eachVali(eltValue, eltReg);
            this._styleChange(key, this.valiRes[key]);
        }
    }

    //外部调用是否通过
    this.isPoss = () => {
        return this.valiRes.poss;
    }
}

let formDate = new VerifyObject(validateFieldOpt);
let submit = document.querySelector('#submit');
submit.onclick = (e) => {
    formDate.inspection(validateFieldOpt);
    if (!formDate.isPoss()) {
        console.log(formDate.valiRes);
        e.preventDefault();
    }
}
