describe('appendField', () => {

});
    it('should create a td element with text content when firstScorer is false', () => {
      const value = "Test Value";
      const firstScorer = false;
      const field = appendField(value, firstScorer);
  
      expect(field.tagName).toBe("TD");
      expect(field.textContent).toBe(value);
    });

