// Populates the core table
$(function(){
  // Demo data
  var data = [
    ["Weekly Update","Enable Data Out loaders to be ran earlier in the pipeline","Cole","Vladimir Li Chris","2016-Q2","Core Operations","Modularize loaders define inputs/outputs create workflows","Small effort commitment"],
    ["Weekly Update","Streamlining Data In weekly update workflow","Cole","Vladimir Li Chris","2016-Q4","Core Operations","Pending design and creation","Medium effort commitment"],
    ["Weekly Update","Moving from a File Based to a Service Based data exchange","Cole","Vladimir Li Chris","2017-Q3","Core Operations","Pending design and creation","Large effort commitment"],
    ["Shared Developer Interests","Move Drupal websites into VM's/containers","Harry","Cole Chris","2016-Q4","Core Operations","Minor configuration adjustments","Small effort commitment"],
    ["Software Collaboration","Enable developers from both sites to have access to both sites source code","Chris","Cole John","2016-Q4","Core Operations","None","Minor effort commitment"],
    ["Software Collaboration","Enable all core projects to have continuous integration & deployment","Chris","John Cole","Ongoing","Core Operations","Minor configuration adjustments for developers","Small effort commitment"],
    ["Distributed PDB","Fully enable D&A on the west coast","John","Chris Cole","2015-Q3","Core Operations","None","Small effort commitment"],
    ["Distributed PDB","Enable session replication - offline backup/migraton on a schedualed basis","John/Cole","Chris","2016-Q1","Core Operations","Identify what needs to be replicated then implement","Medium effort commitment"],
    ["Distributed PDB","Enable session replication - migraton on event/checkpoint basis","John/Cole","Chris","2016-Q4","Core Operations","Design & develop solution","Large effort commitment"],
    ["Distributed PDB","Enable Data In weekly update to be ran/distributed from both coasts","Vladimir","Li","2016-Q3","Core Operations","Enable workflow on both coasts setup DNS to enable data delivery","Medium effort commitment"],
    ["Distributed PDB","Enable a master configuration repository for core services","Vladimir","Li Chris Cole","2017-Q1","Core Operations","Collect data document configuration standardize service delivery","Medium effort commitment"],
    ["Distributed PDB","Apply master configuration repository to core services","Vladimir","Li Chris Cole","2017-Q3","Core Operations","None","Large effort commitment"],
    ["Content Changes","Detailed planning for representation changes - e.g. carbohydrate and EM","John","Jasmine Cathy Chenghua Andreas Peter","2015-Q3","Remediation/D&A","D&A database loaders web delivery ","Large effort commitment"],
    ["Content Changes","Improving modularization of data organization","John","Jasmine Cathy Andreas Peter","Ongoing","D&A","Create graph partitions of existing dictionary relationship hierarchy","Medium effort commitment"],
    ["Content Changes","Better separation in primary and derived data leveraging ERF development","John","Jasmine Ezra Andreas Peter","Ongoing","D&A ERF Remediation","Data file / ERF reorganization ","Large effort commitment + wwPDB"],
    ["Content Changes","Plan for data and metadata versioning","John","Jasmine Zukang Vladimir ","2015-Q3","D&A core operations","Implementation requires tool and update support","Medium effort commitment - for plan"],
    ["Content Changes","Identification of software dependencies ","John","Ezra Andreas","Ongoing","Outreach core operations","Internal test procedures across data pipeline ","Medium effort"],
    ["Content Changes","Plan to expand community interactions and engagement related to data content ","John","Peter Christine","2015-Q3","Outreach","","Medium effort"],
    ["Content Changes","Visualization of multiscale models","John","Peter visualization grant team","2016-Q3","D&A Integrative/hybrid","New software tools/protocols","Large effort commitment"],
    ["Content Changes","Internal working group to track sequence annotation from deposition to delivery","John","Jasmine Ezra Andreas","2016-Q2","D&A ERF","","Small effort commitment"],
    ["Search Functionality","Aggregate entity names using sequence clusters as a custom tabular report","Peter","Chunxiao Bi","2015-Q3","ERF","In progress","Medium effort commitment"],
    ["Search Functionality","Evaluate the ERF containing the aggregated synonyms at different levels of sequence identity","Peter","Jasmine Andreas Helen","2015-Q3","Search ERF","","Minor effort commitment"],
    ["Search Functionality","Plan how to expose this information in the search interface","Peter","Andreas Ezra Chenghua","2015-Q3","Search. ERF","","Medium effort commitment"],
    ["Search Functionality","Use annotated chimera information to break up sequences into fragments","Peter","Andreas Ezra","2016-Q2","Search","","Medium effort"],
    ["Search Functionality","Create a Blast all-vs-all comparison pipeline to map fragments to longer sequences and UniProt","Peter","Andreas John Ezra","2016-Q2","Search ERF","New Blast pipeline","Medium effort"],
    ["Search Functionality","Create/display multiple sequence alignment for cluster members","Peter","Andreas John Ezra","2016-Q3","Search ERF","","Medium effort"],
    ["Search Functionality","Sequence clusters and synonyms available in the D&A pipeline ","Peter","Cole Vladimir","2016-Q2","Search ERF","Minor update changes","Minor effort"],
    ["Search Functionality","Develop user interface to combine queries using Venn diagram","Peter","Andreas Chunxiao Bi Jesse Raul","2016-Q4","Search","Additoinal query processing and database support","Medium effort"],
    ["Search Functionality","Merge queries for different types of data - entries entities ligands biological assemblies literature","Peter","Andreas Chunxiao Bi","2016-Q4","Search","Additoinal query processing and database support","Large effort"],
    ["Search Functionality","Use the same set of data for queries web pages tabular reports and web services","Peter","Chunxiao Bi","2016-Q4","Search","Extension of data warehouse","Large effort"],
    ["Search Functionality","Develop a data warehouse that underlies all services to ensure data consistency","Peter","Chunxiao Bi","2016-Q4","Search","",""],
    ["Image and Map Generation","Prototype packaging and delivery of ED sub-maps","Andreas","Huanwang Ezra Chenghua","2015-Q3","Web/validation feature","",""],
    ["Image and Map Generation","Prototype pipeline to orient images using symmetry code","Andreas","Peter Chenghua Ezra","2015-Q4","","",""],
    ["Image and Map Generation","Generate new images and maps for entire archive to evaluate pipeline","Andreas","Ezra Chenghua","2016-Q1","Web/validation feature","",""],
    ["Image and Map Generation","Incorporate automatic pipeline for weekly update","Andreas","Vladimir Li Cole","2016-Q2","","",""],
    ["Image and Map Generation","Download option for ED maps","Andreas","Huanwang Ezra Chenghua","2016-Q2","Web/validation feature","",""],
    ["Image and Map Generation","Session files/scripts for image generation","Andreas","Ezra","2016-Q4","","",""],
    ["Image and Map Generation","For ligands similar orientation in gallery similarity search","Andreas","Peter Chenghua","2016-Q4","","",""],
    ["ERF Ecosystem","Create ERF template that works internally","Jesse","Jasmine John Andreas Peter","2016-Q1","ERF","Content specification and file format bindings","Small effort commitment"],
    ["ERF Ecosystem","Create ERF template to support bi-directional exchange with external resources","Jesse","Jasmine John Andreas Peter","2016-Q2","ERF","Content specification and file format bindings","Small effort commitment"],
    ["ERF Ecosystem","Create a HUB page for existing and new ERF content","Jesse","Chunxiao Bi","2015-Q3","ERF","New webpage with supporting backend data store","Medium effort commitment"],
    ["ERF Ecosystem","Macromolecular name and synonym ERF delivery","Jesse","Jasmine John Andreas Peter","2016-Q3","ERF","One example of new ERF content to be delivered ","Small effort commitment"],
    ["ERF Ecosystem","Develop prototype to acquire ERF content from external sources.","Jesse","Jasmine John Andreas Peter","2016-Q4","ERF","New UI to accept contributed input ","Large effort commitment"],
    ["ERF Ecosystem","Make a vision","John/Andreas","Peter Jesse Chunxiao","2015-Q3","ERF","","Small effort commitment"]
  ];

  // TODO Get data from database

  // Bind table sorting feature to empty table

  // Loop over all rows
  $.each(data, function(index, row) {
    // Loop over all elements
    var newRow = "<tr>";
    $.each(row, function(index, col){
      if (index == 0) {
        newRow += "<td class='project-area'>" + col + "</td>";
      } else if (index == 2) {
        newRow += "<td class='project-leader'>" + col + "</td>";
      } else if (index == 4) {
        newRow += "<td class='project-targetDate'>" + col + "</td>";
      } else {
        newRow += "<td>" + col + "</td>";
      }
    });
    newRow += "</tr>";
    // Append the new row
    $("#mainTable > tbody:last-child").append(newRow);
  });
  // Now enable the table to be sorted
  $("#mainTable").tablesorter({sortList: [[4,0],[0,0]]});
  $("#mainTable").trigger("update");
});
