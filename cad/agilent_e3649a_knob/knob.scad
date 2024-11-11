use <fillets3d.scad>;

encoder_length_total = 10;
encoder_diameter = 6.1; // actual: 6
encoder_slot_width = 0.8; // actual: 1
encoder_slot_depth = 1.4; // actual: 1.5
encoder_flatside_inset = 1.4; // actual: 1.5
encoder_flatside_length = 6.8; // actual: 6.9

encoder_length_exposed = 3.3;
cutout_diameter = 12.4;

module encoder() {
    difference() {
        linear_extrude(height=encoder_length_total)
            circle(d=encoder_diameter, $fn=64);
        translate([0, 0, encoder_length_total-encoder_slot_depth]) {
            linear_extrude(height=encoder_slot_depth+1)
                square([encoder_slot_width, encoder_diameter+1], center=true);
        }
        translate([0, encoder_diameter-encoder_flatside_inset, encoder_length_total-encoder_flatside_length]) {
            linear_extrude(height=encoder_length_total)
                square([encoder_diameter, encoder_diameter], center=true);
        }
    }
}

knob_diameter = 26;
knob_depth = 10;

knob_divot_diameter = 8;
knob_divot_depth = 1;

ridge_diameter = 1;

difference() {
    translate([0, 0, 0.1]) {
        union() {
            // stem
            linear_extrude(height=encoder_length_total)
                circle(d=cutout_diameter-2, $fn=22);
            // knob
            translate([0, 0, encoder_length_total-encoder_length_exposed]) {
                difference() {
                    topFillet(t=knob_depth, r=3, s=64, e=1)
                        linear_extrude(height=knob_depth, scale=0.85)
                            circle(d=knob_diameter, $fn=128);
                    // knob indentation - your results may vary
                    translate([(knob_divot_diameter/2)+1, 0, knob_depth-knob_divot_depth]) {
                        union() {
                            translate([0, 0, 3])
                                rotate_extrude(convexity = 10, $fn = 100)
                                    translate([knob_divot_diameter/2, 0, 0])
                                        circle(r = 3, $fn = 100);
                            linear_extrude(height=10)
                                circle(d=knob_divot_diameter, $fn=128);
                        }
                    }
                    for(n=[0:47]) {
                        rotate([0, -11, n*7.5]) {
                            translate([(knob_diameter/2)-0.3, 0, -1.5]) {
                                linear_extrude(height=knob_depth, scale=0.85)
                                    circle(d=ridge_diameter, $fn=12);
                            }
                        }
                    }
                }
            }

        }
    }
    encoder();
}
