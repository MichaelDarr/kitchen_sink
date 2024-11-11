desk_thickness = 26;

clip_wall_thickness = 4;

clip_depth = 80;

union() {
  difference() {
    translate([0, 0, clip_wall_thickness*-1])
      linear_extrude(height=(desk_thickness+(clip_wall_thickness*2)))
        square([clip_depth, clip_depth], center=false);
    translate([clip_wall_thickness, clip_wall_thickness, 0])
      linear_extrude(height=desk_thickness)
        square([clip_depth, clip_depth], center=false);
    translate([clip_depth+clip_wall_thickness, clip_depth+clip_wall_thickness, (clip_wall_thickness*-1)-1])
      linear_extrude(height=(desk_thickness+(clip_wall_thickness*2)+2))
        circle(clip_depth, $fn=256);
  };
  difference() {
    translate([0, 0, clip_wall_thickness*-1])
      linear_extrude(height=(desk_thickness+(clip_wall_thickness*2)))
        polygon(points=[[0, 0], [clip_depth, 0], [clip_depth/2, clip_depth/-2]]);
    translate([22, 5, (clip_wall_thickness*-1)-1])
      linear_extrude(height=(desk_thickness+(clip_wall_thickness*2)+2))
        circle(clip_depth/2, $fn=256);
    translate([0, clip_depth*-1, (clip_wall_thickness*-1)-1])
      linear_extrude(height=((desk_thickness+(clip_wall_thickness*2))+2))
        square([36, clip_depth], center=false);
    translate([0, -118.25, (clip_wall_thickness*-1)-1])
      linear_extrude(height=((desk_thickness+(clip_wall_thickness*2))+2))
        square([clip_depth, clip_depth], center=false);
  };
}
