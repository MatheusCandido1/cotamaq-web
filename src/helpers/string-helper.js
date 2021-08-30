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

export const formatSimilar = (value) => {
    const formattedSimilar = value == 0 || value == null || value == 'null' ? 'Não':'Sim'
    return formattedSimilar
}

export const formatCurrency = (value) => {
    if(value == 0 || value == null || value == 'null') {
        return '0.00'
    } else {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
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

export const formatZipcode = (value) => {
    var regex = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;
	if(regex.test(value)){
		return value.replace(regex,"$1.$2-$3");
	}else{
        return 'Não informado'
	}
}

export const formatMissingInformation = (value) => {
    if(value == 'null' || value == null || value == ''){
        return 'Não informado'
    }else {
        return value
    }

}