
   
function show_Category_selector(ndx) {
    var CategoryDim = ndx.dimension(dc.pluck("Category"));
    var CategorySelect = CategoryDim.group();

    dc.selectMenu("#mcdonald-selector")
        .dimension(CategoryDim)
        .group(CategorySelect);
}    

    queue()
       .defer(d3.csv,"data/menu.csv")
       .await(makeGraphs);
       
    function makeGraphs(error,menuData) {
        
        var ndx = crossfilter(menuData);
        
        menuData.forEach(function(d) {
               d.Calories = parseFloat(d.Calories);
               if (isNaN(d.Calories)) {
                   d.Calories = 0;
               }
        });
        
        function add_item(p, v) {
               p.count++;
               p.total += v.Calories;
               p.average = p.total / p.count;
               return p;
           }
   
        function remove_item(p, v) {
               p.count--;
               if(p.count == 0) {
                   p.total = 0;
                   p.average = 0;
               }else {
                   p.total -= v.Calories;
                   p.average = p.total / p.count;
               }
               return p;
           }
           
        function init() {
               return {count:0, total:0, average:0};
           }
            
        var category_dim = ndx.dimension (dc.pluck("Category"));
        var avg_Calories = category_dim.group().reduce(add_item, remove_item, init);
            
        dc.barChart("#chart1")
            .width(500)
            .height(300)
            .margins({top:10, right:50,bottom: 30, left:50})
            .dimension(category_dim)
            .group(avg_Calories)
            .valueAccessor(function(d){
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Category")
            .yAxisLabel("Avg.Calories")
            .yAxis().ticks(4);
            
            
            
    //   ---------------chart2    

        menuData.forEach(function(d) {
               d.TotalFat = parseFloat(d.TotalFat);
               if (isNaN(d.TotalFat)) {
                   d.TotalFat = 0;
               }
        });

         
         
         function add_item2(p, v) {
               p.count++;
               p.total += v.TotalFat;
               p.average = p.total / p.count;
               return p;
           }
   
        function remove_item2(p, v) {
               p.count--;
               if(p.count == 0) {
                   p.total = 0;
                   p.average = 0;
               }else {
                   p.total -= v.TotalFat;
                   p.average = p.total / p.count;
               }
               return p;
           }
           
            
        var Category_dim = ndx.dimension (dc.pluck("Category"));
        var avg_TotalFat = Category_dim.group().reduce(add_item2, remove_item2, init);
            
        dc.barChart("#chart2")
            .width(500)
            .height(300)
            .margins({top:10, right:50,bottom: 30, left:50})
            .dimension(Category_dim)
            .group(avg_TotalFat)
            .valueAccessor(function(d){
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Category")
            .yAxisLabel("Avg.TotalFat")
            .yAxis().ticks(4);
  
           
         //   --------chart3
         
         menuData.forEach(function(d) {
              d.Cholesterol = parseFloat(d.Cholesterol);
              if (isNaN(d.Cholesterol)) {
                  d.Cholesterol = 0;
              }
        });

         
         
         function add_item3(p, v) {
              p.count++;
              p.total += v.Cholesterol;
              p.average = p.total / p.count;
              return p;
          }
   
        function remove_item3(p, v) {
              p.count--;
              if(p.count == 0) {
                  p.total = 0;
                  p.average = 0;
              }else {
                  p.total -= v.Cholesterol;
                  p.average = p.total / p.count;
              }
              return p;
          }
           
            
        var Category_dim = ndx.dimension (dc.pluck("Category"));
        var avg_Cholesterol = Category_dim.group().reduce(add_item3, remove_item3, init);
            
        dc.barChart("#chart3")
            .width(500)
            .height(300)
            .margins({top:10, right:50,bottom: 30, left:50})
            .dimension(Category_dim)
            .group(avg_Cholesterol)
            .valueAccessor(function(d){
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Category")
            .yAxisLabel("Avg.Cholesterol")
            .yAxis().ticks(4);
  
           
         
         
         //   --------chart4
         
         menuData.forEach(function(d) {
              d.Carbohydrates = parseFloat(d.Carbohydrates);
              if (isNaN(d.Carbohydrates)) {
                  d.Carbohydrates = 0;
              }
        });

         
         
         function add_item4(p, v) {
              p.count++;
              p.total += v.Carbohydrates;
              p.average = p.total / p.count;
              return p;
          }
   
        function remove_item4(p, v) {
              p.count--;
              if(p.count == 0) {
                  p.total = 0;
                  p.average = 0;
              }else {
                  p.total -= v.Carbohydrates;
                  p.average = p.total / p.count;
              }
              return p;
          }
           
            
        var Category_dim = ndx.dimension (dc.pluck("Category"));
        var avg_Carbohydrates = Category_dim.group().reduce(add_item4, remove_item4, init);
            
        dc.barChart("#chart4")
            .width(500)
            .height(300)
            .margins({top:10, right:50,bottom: 30, left:50})
            .dimension(Category_dim)
            .group(avg_Carbohydrates)
            .valueAccessor(function(d){
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Category")
            .yAxisLabel("Avg.Carbohydrates")
            .yAxis().ticks(4);
  
           
         //   --------chart5
         
         menuData.forEach(function(d) {
              d.Sugars = parseFloat(d.Sugars);
              if (isNaN(d.Sugars)) {
                  d.Sugars = 0;
              }
        });

         
         
         function add_item5(p, v) {
              p.count++;
              p.total += v.Sugars;
              p.average = p.total / p.count;
              return p;
          }
   
        function remove_item5(p, v) {
              p.count--;
              if(p.count == 0) {
                  p.total = 0;
                  p.average = 0;
              }else {
                  p.total -= v.Sugars;
                  p.average = p.total / p.count;
              }
              return p;
          }
           
            
        var Category_dim = ndx.dimension (dc.pluck("Category"));
        var avg_Sugars = Category_dim.group().reduce(add_item5, remove_item5, init);
            
        dc.barChart("#chart5")
            .width(500)
            .height(300)
            .margins({top:10, right:50,bottom: 30, left:50})
            .dimension(Category_dim)
            .group(avg_Sugars)
            .valueAccessor(function(d){
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Category")
            .yAxisLabel("Avg.Sugars")
            .yAxis().ticks(4);
  
           
         
         //   --------chart6
         
         menuData.forEach(function(d) {
              d.Protein = parseFloat(d.Protein);
              if (isNaN(d.Protein)) {
                  d.Protein = 0;
              }
        });

         
         
         function add_item6(p, v) {
              p.count++;
              p.total += v.Protein;
              p.average = p.total / p.count;
              return p;
          }
   
        function remove_item6(p, v) {
              p.count--;
              if(p.count == 0) {
                  p.total = 0;
                  p.average = 0;
              }else {
                  p.total -= v.Protein;
                  p.average = p.total / p.count;
              }
              return p;
          }
           
            
        var Category_dim = ndx.dimension (dc.pluck("Category"));
        var avg_Protein = Category_dim.group().reduce(add_item6, remove_item6, init);
            
        dc.barChart("#chart6")
            .width(500)
            .height(300)
            .margins({top:10, right:50,bottom: 30, left:50})
            .dimension(Category_dim)
            .group(avg_Protein)
            .valueAccessor(function(d){
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Category")
            .yAxisLabel("Avg.Protein")
            .yAxis().ticks(4);
  
           
         
           
        //   --------chart7 
           
        
        var Category_dim = ndx.dimension(dc.pluck('Category'));
        var Category_total = Category_dim.group()
        
        dc.pieChart('#chart7')
            .height(400)
            .radius(200)
            .transitionDuration(1500)
            .dimension(Category_dim)
            .group(Category_total);
    
            
            var CategoryDim = ndx.dimension(dc.pluck("Category"));
            var CategorySelect = CategoryDim.group();
        
            dc.selectMenu("#mcdonald-selector")
                .dimension(CategoryDim)
                .group(CategorySelect);
            
            
        dc.renderAll();
        
    }
    
