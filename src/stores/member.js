import { defineStore } from 'pinia'
// import { LocalStorage } from 'quasar'
import { apiAuth, apiShit } from 'src/boot/axios'
import { DateTime } from 'luxon'
export const UseMemberStore = defineStore('member', {
  state: () => ({
    memberdetail: [],
    shouldAddPerson: false,
    shouldCopyPerson: false,
    persontel: '', // 手機
    personname: '', // 姓名
    persontele: '', // 市話
    persontin: '', // 統編
    personcompany: '', // 公司名稱
    personaddress1: '', // 號樓
    personroad: '', // 路名
    personcityid: '', // 城市
    personstateid: '', // 縣市
    memberlength: 0,
    select: { year: DateTime.now().year, month: DateTime.now().month.toString().padStart(2, '0') }
  }),
  actions: {
    async getmemberdetail (val) {
      try {
        this.memberdetail.splice(0, this.memberdetail.length)
        const { data } = await apiAuth.get(`member/member/${val}`)
        this.memberdetail.push(data)
      } catch (error) {
        console.error('Failed to get state:', error)
        // 在這裡處理錯誤，例如通過顯示一個錯誤消息給用戶
      }
    },
    addpersontel (val, val2, val3, val4, val5) {
      this.memberdetail.splice(0, this.memberdetail.length)
      this.persontel = ''// 手機
      this.personname = '' // 姓名
      this.persontele = '' // 市話
      this.persontin = ''// 統編
      this.personcompany = ''// 公司名稱
      this.personaddress1 = ''// 號樓
      this.personroad = ''// 路名
      this.personcityid = ''// 城市
      this.personstateid = '' // 縣市
      // console.log(val, val2, val3, val4, val5)
      this.persontel = val
      this.persontin = val2
      this.personname = val3
      this.personcompany = val4
      this.persontele = val5
    },
    justcopy (val, val2, val3, val4, val5, val6, val7) {
      this.memberdetail.splice(0, this.memberdetail.length)
      this.persontel = ''// 手機
      this.personname = '' // 姓名
      this.persontele = '' // 市話
      this.persontin = ''// 統編
      this.personcompany = ''// 公司名稱
      this.personaddress1 = ''// 號樓
      this.personroad = ''// 路名
      this.personcityid = ''// 城市
      this.personstateid = '' // 縣市
      // -------------------------------------------
      this.persontele = val
      this.persontin = val2
      this.personroad = val3
      this.personcompany = val4
      this.personaddress1 = val5
      this.personcityid = val6
      this.personstateid = val7
    },
    async getcustomer () {
      try {
        const { data } = await apiShit.post('newcus', {
          startDate: this.select.year + '-' + this.select.month,
          endDate: this.select.year + '-' + this.select.month
        })

        this.memberlength = Object.keys(data).length
      } catch (error) {
        console.log(error)
      }
    }
  }
})
