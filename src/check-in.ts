import {toEncode, toPara} from './utils';
import dayjs from 'dayjs'
import {message} from './message'
import * as service from './services'

export const checkIn = async () => {
    const {data} = await service.sign({
        encode: toEncode(JSON.stringify({
            date: +new Date,
            signSource: "smlprgrm",
            phone: process.env.PHONE
        }),'34d7cb0bcdf07523')
    })

    if (data.code === 0) {
        message.info(`πγη­Ύε°γ${data.msg}`)
        return
    }
    message.info(`πγη­Ύε°γ+${data.coin}ιθ±`)
    message.info(`πγθΏη»­η­Ύε°γ${data.continuousDay}ε€©`)
    message.info(`π¦γζ¬ε¨η­Ύε°γ${data.continuousDay}ε€©`)
    const {date, recordNum} = await service.activityMsg({para: toPara({phone: process.env.PHONE})})
    if (!recordNum) return
    const {code,msg} = await service.convertReward({para: toPara({rewardId: date.id, month: dayjs().format('YYYYMM')})})
    if(code==="1"){
        message.warning(`γεζ’θ―θ΄Ήγ${msg}`)
        return
    }
    message.success(`γεζ’θ―θ΄Ήγ${msg}`)
}