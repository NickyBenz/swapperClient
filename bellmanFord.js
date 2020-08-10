const bellmanFord = function(G, S) {
  V = G.length;
  distance = Array(V).fill(Infinity);  
  distance[S] = 0;
  paths = {};

    for (var ii=0; ii < V; ++ii)
    {
      for(var jj=0; jj < V; ++jj)
      {
        for(var kk=0; kk < V; ++kk)
        {
            if (distance[jj] < Infinity && G[jj][kk] < Infinity)
            {
              var dist = distance[jj] + G[jj][kk];
              if (dist < distance[kk])
              {
                  if (paths.hasOwnProperty(kk))
                  {
                      if (paths[kk].filter(x => x === jj).length > 0)
                      {
                          continue;
                      }
                  }

                  if (paths.hasOwnProperty(jj))
                  {
                    if (paths[jj].filter(x => x === jj).length > 1)
                    {
                        continue;
                    }
                    arr = paths[jj].slice();
                    arr.push(jj)
                    paths[kk] = arr;
                  }
                  else
                  {
                    paths[kk] = [];
                    paths[kk].push(jj);
                  }

                  distance[kk] = dist;

                  //if (kk === V - 1 && dist < -0.1) return [distance, paths];
              }
            }
        }
      }
  }
  return [distance, paths];
}

module.exports = {bellmanFord};
