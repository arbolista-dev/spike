
export const MORK_ROUTES = {
	name: "MockRoute",
	path: "/:mock1?/mock2/:mock3?",
	url: function(payload,i18n) {
		return `/${i18n.t('MockRoute')}/${payload._id}/success`
	}
}
export const MOCK_PAYLOAD= {
	_id:"MockValue"
}
export const MOCK_LOCALSTORAGE = {
	token:"123456",
	mockdata:JSON.stringify({
		mockkey:"mockvalue"
	}),
	getItem:(value)=> MOCK_LOCALSTORAGE[value]
}

export const MOCK_STORE = {
	session: { token: '123456',get:(key)=> this[key]},
	location: {pathname: '/mockValue1/mock2/mockValue2'}
}