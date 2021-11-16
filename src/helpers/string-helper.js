export const formatEquipment = (equipment) => {
    if(equipment == null) {
        return 'Não informado'
    }
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

export const formatMeasure = (measure) => {
    if (measure == 'g'){
        return 'Grama (g)'
    } else if (measure == 'kg'){
        return 'Quilograma (kg)'
    } else if (measure == 'm'){
        return 'Metro (m)'
    } else if (measure == 'mm'){
        return 'Milímetro (mm)'
    } else if (measure == 'cm'){
        return 'Centímetro (cm)'
    } else if (measure == 'pol'){
        return 'Polegada (pol)'
    } else if (measure == 'l'){
        return 'Litro (l)'
    } else if (measure == 'o'){
        return 'Outro'
    } else {
        return 'Não informado'
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
    if(value == 'null' || value == null || value == '' || value == null){
        return 'Não informado'
    }else {
        return value
    }
}

export const formatDiscountPercent = (value) => {
    if(value == 'null' || value == null || value == '' || value == null){
        return 'Não informado'
    }else {
        return `${value}%`
    }
}