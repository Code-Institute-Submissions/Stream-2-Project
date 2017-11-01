
   
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
            .height(400)
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
            .height(400)
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
           
        
        var Category_dim = ndx.dimension(dc.pluck('Category'));
        var Category_total = Category_dim.group()
        
        dc.pieChart('#chart3')
            .height(500)
            .radius(250)
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
    
