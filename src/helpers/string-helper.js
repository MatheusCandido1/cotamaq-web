export const formatEquipment = (equipment) => {
    const formattedDescription = equipment.description ? equipment.description:''
    const formattedYear = equipment.year ? equipment.year:''
    const formattedPatrimony = equipment.patrimony ? ' ('+equipment.patrimony+')':''
    return formattedDescription + ' - ' + formattedYear + formattedPatrimony
}
