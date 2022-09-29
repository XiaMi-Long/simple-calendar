/*
 * @Descripttion:
 * @version:
 * @Author: wwy
 * @Date: 2022-09-15 14:29:49
 * @LastEditors: wwy
 * @LastEditTime: 2022-09-29 23:08:43
 */
/**
 * @name: wwy
 * @msg: 日历组件类
 * @return {*}
 */
class Lcalendar {
  obj = {
    id: '',
    /* 初始化日期,默认为今天 */
    initDate: null,
    /* 语言化 */
    languageTextArray: ['一', '二', '三', '四', '五', '六', '七'],
  }

  /**
   * @name: wwy
   * @msg: 日历组件的整体节点
   * @return {*}
   */
  calendarDocument = null

  constructor(obj) {
    this.loadParams(obj)
    this.init()
  }

  /**
   * @name: wwy
   * @msg: 读取参数,并对获取到参数就行初始化准备
   * @param {*} obj
   * @return {*}
   */
  loadParams(obj) {
    this.obj.id = obj.id
    this.obj.initDate = obj.initDate ?? new Date()

    this.calendarDocument = document.getElementById(this.obj.id)
    console.log(this.obj)
    console.log(this.calendarDocument)
  }

  /**
   * @name: wwy
   * @msg: 初始化各项
   * @return {*}
   */
  init() {
    const headerStr = this.generateHeaderDocument()
    const bodyStr = this.generateBodyDocument()
    this.calendarDocument.innerHTML = headerStr + bodyStr
  }

  /**
   * @name: wwy
   * @msg: 生成组件头部
   * @return {*}
   */
  generateHeaderDocument() {
    return `<div class="c-calendar-header">
            <!-- 标题时间 -->
            <div class="title">
              2020
            </div>
            <!-- 换月 -->
            <div class="update-month">
              <span class="button">&lt;</span>
              &nbsp;
              <span class="button">&gt;</span>
            </div>
          </div>`
  }

  /**
   * @name: wwy
   * @msg: 生成组件主体部分
   * * 1. 计算1号是星期几
   * @return {string} 主体的dom字符串
   */
  generateBodyDocument() {
    let resultStr = ''

    /* 生成顶部 */
    resultStr += `<div class="c-calendar-body">
                    <table class="c-calendar-container-table">
                      <tr class="c-calendar-tr">`
    for (let index = 0; index < 7; index++) {
      resultStr += `<th class="day-name-item">${this.obj.languageTextArray[index]}</th>`
    }

    resultStr += `</tr>`

    /* 生成底部 */
    const date = this.obj.initDate
    const maxDays = DateUtil.maxDays(date)
    date.setDate(1)

    const day = date.getDay()

    if (day === 0) {
      day = 7
    }

    for (let index = 0; index < 42; index++) {
      if (index === 0 || index % 7 === 0) {
        resultStr += `<tr class="c-calendar-tr">`
      }

      // * 如果不是从这天开始 或者 大于这个月最大天数
      // * index + 1 (index 从0开始 day从1开始)
      // * maxDays + day - 1 如果不加day - 1 就只会走最大天数减去判断是不是从这天开始的几次
      if (index + 1 < day || index > maxDays + day - 2) {
        console.log(index)
        resultStr += `<td class="day-item">
                      <div class="background-box">
                        <p class="day-text"></p>
                      </div>
                    </td>`

        continue
      }

      // * index - day + 2
      // * day本身从1开始计数,本身就比index多1,其次如果index - day + 1 ---> 3 - 4 + 1 结果就会是从0开始, 展示要从1开始,所以要加2
      resultStr += `<td class="day-item">
                        <div class="background-box">
                          <p class="day-text">${index - day + 2}</p>
                        </div>
                      </td>`

      if (index + (1 % 7) === 0) {
        resultStr += ` </tr>`
      }
    }

    return resultStr
  }
}

/**
 * @name: wwy
 * @msg: 日期计算类
 * @return {*}
 */
class DateUtil {
  static day = {
    1: 31,
    3: 31,
    5: 31,
    7: 31,
    8: 31,
    10: 31,
    12: 31,
    4: 30,
    6: 30,
    9: 30,
    11: 30,
  }

  /**
   * @name: wwy
   * @msg: 计算给出的时间对象中,指定的月份最大多少天
   * @param {Date} date 时间对象
   * @return {Number} 当前月份有几天
   */
  static maxDays(date) {
    const getMonth = date.getMonth() + 1
    return this.day[`${getMonth}`]
  }
}

const calendar = new Lcalendar({ id: 'c-calendar-container' })
