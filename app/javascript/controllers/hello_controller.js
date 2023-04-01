import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "name", "output" ]

  greet(event) {
    // this.outputTarget.textContent =
    //     `Hello, ${this.nameTarget.value}!`

    this.token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(event.target.getAttribute('data-url'), {
      method: 'POST',
      headers: {
        'X-CSRF-Token': this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: '1',
          type: 'event',
          studio_id: '2'
      })
    }).then(response => response.text())
        .then(html => Turbo.renderStreamMessage(html))
  }
}
