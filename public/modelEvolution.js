//use strict;

//data
let guideLineTrace = {
    x:[0, 1],
    y:[0, 1],
    name: 'guide line y=x',
    mode: 'lines'
};

let modelTrace = {
    x: [],
    y: [],
    name: 'model trace',
    mode: 'lines'
};

let intersectionTrace = {
    x: [],
    y: [],
    text:[],
    name: 'X entries',
    textposition:'top center',
    mode: 'markers+text'
};

let timeSeriesTrace = {
    x: [],
    y: [],
    name: 'Transformed Population',
    mode: 'markers+lines'
};

let modelPlotData = [guideLineTrace, modelTrace, intersectionTrace];
let timePlotData = [timeSeriesTrace];

let modelPlotLayout={
    xaxis: {title:"X@n"},
    yaxis: {title:"X@n+1"}
};
let timePlotLayout={
    xaxis: {title: "step #"},
    yaxis: {title: "X"}
};

//functions
function modelFunctionGenerator(alpha){
    return function(x){return alpha*x*(1-x)};
}

let modelFunction = modelFunctionGenerator(1.5);

function partialPlotIntersectionTrace(x) {
    Plotly.extendTraces('model-plot', {x:[[x]], 
        y:[[modelFunction(x)]], text:[['' + (1 + intersectionTrace.x.length)]]},[2]);
}

function partialPlotModelTrace(x) {
    Plotly.extendTraces('model-plot', {x:[[x]], y:[[modelFunction(x)]]},[1]);
}

function partialPlotTimeSeriesTrace(x,y) {
    Plotly.extendTraces('time-plot', {x:[[x]], y:[[y]]},[0]);
}

Plotly.newPlot('model-plot', modelPlotData, modelPlotLayout);
Plotly.newPlot('time-plot', timePlotData, timePlotLayout);

//plot out model
const modelDomain = [];
for (let i = 0; i <= 20; i++) {
    modelDomain.push(i*0.05);
}

modelDomain.forEach(function(value, index, theArray){
    partialPlotModelTrace(value);
})

//kick off model evolution
let x0 = 0.6;
let xPrev = x0;

for(let i = 0; i <= 50; i++){
    let xNext = modelFunction(xPrev); 
    partialPlotIntersectionTrace(xPrev);
    partialPlotTimeSeriesTrace(i, xPrev);
    xPrev = xNext;
}
