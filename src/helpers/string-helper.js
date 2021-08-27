export const formatEquipment = (equipment) => {
    const formattedDescription = equipment.description ? equipment.description:''
    const formattedYear = equipment.year ? ' - ' + equipment.year:''
    const formattedPatrimony = equipment.patrimony ? ' ('+equipment.patrimony+')':''
    return formattedDescription + formattedYear + formattedPatrimony
}

export const formatSimillar = (value) => {
    const formattedSimilar = value == 0 ? 'Não':'Sim'
    return formattedSimilar
}

export const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export const formatDelivery = (delivery, days) => {
    if(delivery == 0) {
    return 'Entrega imediata'
    } else {
        if(days == 1) {
            return 'Entrega: 1 dia'
        } else {
            return 'Entrega: ' + days + ' dias'
        }
    }
}