//此处实质为一个action的注册表，因为每个reducer都会接收到action，
// 所以type尽可能唯一，以免导致误操作
export const LOADSYSFORCEDATA="LOADSYSFORCEDATA";
export const TODOITEMRELOAD="TODOITEMRELOAD";


export function loadSysForceData(data){
    return {
        type:LOADSYSFORCEDATA,
        data:data
    };
}

export function todoItemReload() {
    return {
        type:TODOITEMRELOAD
    };
}
