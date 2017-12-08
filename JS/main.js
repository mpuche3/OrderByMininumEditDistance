
function ok() {
    let a = document.getElementById("A").value.toUpperCase()
        .replace(/\s+/g, '').trim();
    let b = document.getElementById("B").value.toUpperCase()
        .split(/[\n|\t+|\/]/).filter(x=>x!=="")
        .filterDuplicates();
    document.getElementById("C").value = b.map((x) => {
        let str = x.replace(/\s+/g, '').trim();
        if (getEditDistance(a, str) < 10){
            return "#00"  + getEditDistance(a, str) + " >>> " + x;
        } else if (getEditDistance(a, str) < 100) {
            return "#0"  + getEditDistance(a, str) + " >>> " + x;
        } else {
            return "#"  + getEditDistance(a, str) + " >>> " + x;
        }
    }).sort().join("\n");  
};

getEditDistance = function(a, b){
  if(a.length === 0) return b.length; 
  if(b.length === 0) return a.length; 

  let matrix = [];

  for(let i = 0; i <= b.length; i+=1){
    matrix[i] = [i];
  }

  for(let j = 0; j <= a.length; j+=1){
    matrix[0][j] = j;
  }

  for(let i = 1; i <= b.length; i+=1){
    for(let j = 1; j <= a.length; j+=1){
      if(b.charAt(i-1) === a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(
            matrix[i-1][j-1] + 1,
            matrix[i][j-1] + 1,
            matrix[i-1][j] + 1);
      }
    }
  }

  return matrix[b.length][a.length];
};

Array.prototype.filterDuplicates = function() {
    let seen = {};
    return this.filter(item => seen.hasOwnProperty(item) ? false : seen[item] = true);
};