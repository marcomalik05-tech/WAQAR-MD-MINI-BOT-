var commands = [];

function waqar(info, func) {
    var data = info;
    data.function = func;
    
    // Si pas de pattern, on utilise cmdname
    if (!data.pattern && data.waqarname) data.pattern = data.waqarname;
    
    if (!data.alias) data.alias = [];
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!data.desc) data.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!data.category) data.category = 'misc';
    
    commands.push(data);
    return data;
}

module.exports = {
    waqar,
    AddCommand: waqar,
    Function: waqar,
    commands,
};

