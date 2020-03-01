const getDataByPath = (path, data) => {
	let r = data
	for(let i in path) {
		if(Array.isArray(r)){
			let j = 0
			while(r[j].name != path[i]) {
				j = j + 1
			}
			r = r[j].data
		}
		else{
			r = data["data"]
		}
	}
	return r
}


const putToPath = (elem, path) => {
	path.push(elem)
	return path
}



const getListOfButtons = (data) => {
	res = []
	for(i in data) {
		if(data[i].name) {
			res.push(data[i].name)
		}

	}
	return res
}


const onButtonClick = (name, path) => {

	for(i in path) {
		if(path[i] == name) {
			return path
		}
	}

	if(name ==  'Главное меню') {
		return ['main menu']
	}
	else if(name != 'Назад') {
		path.push(name)
		return path
	}
	else if(path.length > 1) {
		path.pop()
		return path
	}
	return path
}



module.exports.getDataByPath = getDataByPath
module.exports.putToPath = putToPath;
module.exports.getListOfButtons = getListOfButtons
module.exports.onButtonClick = onButtonClick







