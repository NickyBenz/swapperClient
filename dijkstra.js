const { default: BigNumber } = require("bignumber.js");

function minDistance(dist, sptSet, N) 
{ 
    var min = Infinity;
    var min_index = -1; 

    for (var v = 0; v < N; ++v)
    { 
        if (sptSet[v] === false &&  dist[v] <= min)
        { 
            min = dist[v];
            min_index = v;
        }
    } 
    return min_index; 
} 

const dijkstra = function (graph, source) {
    V = graph.length;
    distance = Array(V).fill(Infinity);  
    sptSet = Array(V).fill(false); 
    parent = Array(V).fill(null);
    parent[source] = -1; 
    distance[source] = 1; 

    for (var count = 0; count < V-1; ++count) 
    { 
        var u = minDistance(distance, sptSet, V); 
        sptSet[u] = true; 
        for (var v = 0; v < V; ++v) 
        {
            if (!sptSet[v] && graph[u][v] < Infinity &&
                distance[u] < Infinity 
                && distance[u] * graph[u][v] < distance[v]) 
            { 
                parent[v] = u;
                distance[v] = distance[u] * graph[u][v];
            }  
        } 
    }
    
    return [distance, parent];
};


const findPath = function(parent, j, paths, sourceNode, N) 
{ 
    if (parent[j] === - 1) 
    {
        paths.push(sourceNode); 
        return;
    }
  
    findPath(parent, parent[j], paths, sourceNode, N); 
    
    if (j < N)
    {
        paths.push(j); 
    }
    else
    {
        paths.push(sourceNode);
    }
};
  
const verifyArb = function (dist, parent, keys, sourceNode, prices, notional) 
{
    paths = [];
    var arb = BigNumber(1).dividedBy(dist[keys.length]).toNumber();

    findPath(parent, keys.length, paths, sourceNode, keys.length);
    paths.map((val) => console.log(keys[val]));
    
    var value = notional;
    for(ii = 1; ii < paths.length; ++ii)
    {
        value *= prices[paths[ii-1]][paths[ii]];
    }
    console.log("Result -> " + value + " for " + notional);
    

    return paths;
};

module.exports = {dijkstra, findPath, verifyArb};