
    queue()
       .defer(d3.csv,"data/menu.csv")
       .await(makeGraphs);
       
    function makeGraphs(error,menuData) {
        
        var ndx = crossfilter(menuData);
        
        
        
        var CategoryDim = ndx.dimension(dc.pluck("Category"));
        var CategorySelect = CategoryDim.group();
    
        dc.selectMenu("#mcdonald-selector")
            .dimension(CategoryDim)
            .group(CategorySelect);
        
        
        
        
        var itemDim = ndx.dimension(dc.pluck('Item'));
        var caloriesGroup = itemDim.group().reduceSum(dc.pluck('Calories'));

        var caloriesRowChart = dc.rowChart("#calories-row");
        caloriesRowChart
            .width(600)
            .height(330)
            .dimension(itemDim)
            .group(caloriesGroup)
            .cap(10)
            .othersGrouper(false)
            .xAxis().ticks(4)
            


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
          
        function init() {
              return {count:0, total:0, average:0};
          }
           
            
        
        var avg_TotalFat = CategoryDim.group().reduce(add_item2, remove_item2, init);
        // var color = d3.scale.ordinal()
        //       .domain(["Beef & Pork", "Beverages", "Breakfast","Chicken & Fish","Coffee & Tea","Desserts","Salads","Smoothies &Shakes","Snacks & Sides"])
        //       .range(["#fff","#000","#333","#fff","#000","#333","#fff","#000","#333"]);

   
        dc.barChart("#chart1")
            .width(600)
            .height(350)
            // .colorScales = d3.scale.ordinal()
            //   .domain(["Beef & Pork", "Beverages", "Breakfast","Chicken & Fish","Coffee & Tea","Desserts","Salads","Smoothies &Shakes","Snacks & Sides"])
            //   .range(["#fff","#000","#333","#fff","#000","#333","#fff","#000","#333"])

            .margins({top:30, right:50, bottom:80, left:50})
            .dimension(CategoryDim)
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
            
            
        var veggie_dim = ndx.dimension(dc.pluck('veg'));
        console.log(veggie_dim)
        var veggie_total = veggie_dim.group()
        
        dc.pieChart('#chart2')
            .height(400)
            .radius(200)
            .transitionDuration(1500)
            .dimension(veggie_dim)
            .group(veggie_total);
  
  
  
    //   var genderColors = d3.scale.ordinal()
    //     .domain(["Female", "Male"])
    //     .range(["pink", "blue"]);
        
        
 
        
        var servingSizeDim = ndx.dimension(function(d){
            return [d.ServingSizePerGram, d.Calories];
        });
        
        
        var unkownGroup = servingSizeDim.group();
        
        
        
        var caloriesDim = ndx.dimension(function(d){
            if(d['Calories'] >=0 && d['Calories'] <=100)
                return '0-100';
            else if(d['Calories'] >100 && d['Calories'] <=200)
                return '100-200';
            else if(d['Calories'] >200 && d['Calories'] <=300)
                return '200-300';
            else if(d['Calories'] >300 && d['Calories'] <=400)
                return '300-400';
            else
                return '400+'
        });
        
        var minCal = caloriesDim.bottom(1)[0].Calories;
        var maxCal = caloriesDim.top(1)[0].Calories;
        
        dc.scatterPlot("#calory-ss-scatter")
            .width(800)
            .height(400)
            .x(d3.scale.linear().domain([minCal,maxCal]))
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(10)
            .yAxisLabel("Serving Size")
            .xAxisLabel("Calories")
            // .title(function (d) {
            //     return d.value + " " + d.key[3] + " " + d.key[2] + " earned " + d.key[1];
            // })
            .colorAccessor(function (d) {
                return d.key[3];
            })
            
            .dimension(servingSizeDim)
            .group(unkownGroup)
            .margins({top: 10, right: 50, bottom: 75, left: 75});
        
        
        
    
        dc.renderAll();
        
    }
    
