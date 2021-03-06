describe('Airport',function() {

  beforeEach(function() {
    airport = new Airport();
    // var plane = null;
    plane = new Plane("Plane");
    plane_2 = new Plane("Plane2");
    plane_3 = new Plane("Plane3");
    weather = new Weather();
  });

  describe('when instructing plane', function(){

    describe('to land', function(){

      beforeEach(function(){
        spyOn(weather, 'isStormy').and.returnValue(false)
      });

      it('updates the planes array', function(){
        airport.land(plane);
        expect(airport.planes.length).toEqual(1);
      });

      it('It returns a message', function(){
        expect(airport.land(plane)).toEqual("Plane has landed!");
      });

      it('Returns error if already landed', function(){
        airport.land(plane);
        expect(function() {airport.land(plane)}).toThrow("Plane is already on the ground!")
      });

      it('Plane cannot land if airport is full', function (){
        airport.land(plane_2);
        airport.land(plane_3);
        expect(function() {airport.land(plane)}).toThrow("Airport is full!")
      });
    });

    describe('to take off', function(){

      beforeEach(function(){
        spyOn(weather, 'isStormy').and.returnValue(false)
      });

      it('updates the planes array', function(){
        airport.land(plane);
        airport.takeOff(plane);
        expect(airport.planes.length).toEqual(0);
      });

      it('It returns a message', function(){
        airport.land(plane);
        expect(airport.takeOff(plane)).toEqual("Plane has taken off!");
      });

      it('Returns error if already flying', function(){
        expect(function() {airport.takeOff(plane)}).toThrow("Plane is already in the air!")
      });
    });

    describe('bad weather', function(){

      beforeEach(function() {
      });

      it('plane cannot take off when stormy', function(){
        spyOn(Math, 'random').and.returnValue(0.2);   
        airport.land(plane);
        spyOn(weather, 'isStormy').and.returnValue(true);
        expect(function() { airport.takeOff(plane)}).toThrow("Weather is stormy, can't take off!");
      });

      it('prevents landing when stormy', function(){
        spyOn(weather, 'isStormy').and.returnValue(true);
        expect(function() { airport.land(plane)}).toThrow("Weather is stormy, can't land!");
      });
    });
  });
});
