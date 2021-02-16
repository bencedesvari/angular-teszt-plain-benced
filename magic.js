class Szamla {
    constructor(nev, nevertek, penznem, statusz) {
        this.nev = nev;
        this.nevertek = nevertek;
        this.penznem = penznem;
        this.statusz = statusz;
    }
}

class UI{
    addSzamlaToList(szamla){
        const list = document.getElementById('szamla-list');
        const row = document.createElement('tr');
        row.innerHTML = `
          
            <td>${szamla.nev}</td>
            <td>${szamla.nevertek}</td>
            <td>${szamla.penznem}</td>
            <td>${szamla.statusz}</td>
        `;
        list.appendChild(row);
    }


clearFields(){
    document.getElementById('nev').value= '';
    document.getElementById('nevertek').value= '';
    document.getElementById('penznem').value= '';
    document.getElementById('statusz').value= '';
    }
}

// Local Storage Class
class Store {
    static getSzamlak() {
      let szamlak;
      if(localStorage.getItem('szamlak') === null) {
        szamlak = [];
      } else {
        szamlak = JSON.parse(localStorage.getItem('szamlak'));
      }
  
      return szamlak;
    }
  
    static displayszamlak() {
      const szamlak = Store.getSzamlak();
  
      szamlak.forEach(function(szamla){
        const ui  = new UI;
  
        // Add szamla to UI
        ui.addSzamlaToList(szamla);
      });
    }
  
    static addSzamla(szamla) {
      const szamlak = Store.getSzamlak();
  
      szamlak.push(szamla);
  
      localStorage.setItem('szamlak', JSON.stringify(szamlak));
    }
  
    static removeSzamla(isbn) {
      const szamlak = Store.getSzamlak();
  
      szamlak.forEach(function(szamla, index){
       if(szamla.isbn === isbn) {
        szamlak.splice(index, 1);
       }
      });
  
      localStorage.setItem('szamlak', JSON.stringify(szamlak));
    }
  }
  
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayszamlak);
  
  // Event Listener for add szamla
  document.getElementById('szamla-form').addEventListener('submit', function(e){
    // Get form values
    const nev = document.getElementById('nev').value,
          nevertek = document.getElementById('nevertek').value,
          penznem = document.getElementById('penznem').value,
          statusz = document.getElementById('statusz').value
  
    // Instantiate szamla
    const szamla = new Szamla(nev, nevertek, penznem, statusz);
  
    // Instantiate UI
    const ui = new UI();
  
    console.log(ui);
  
    // Validate
    if(nev === '' || nevertek === '' || penznem === '' || statusz === '') {
      // Error alert
      ui.showAlert('Kérem töltse ki az összes mezőt!', 'hiba');
    } else {
     
      ui.addSzamlaToList(szamla);
  
      // Add to LS
      Store.addSzamla(szamla);
  
      // Show success
      ui.showAlert('Számla hozzáadva!', 'siker');
  
      // Clear fields
      ui.clearFields();
    }
  
    e.preventDefault();
  });