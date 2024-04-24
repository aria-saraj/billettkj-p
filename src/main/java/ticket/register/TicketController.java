package ticket.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class TicketController {

    @Autowired
    private TicketRepository rep;

    @GetMapping("/getTickets")
    public List<Ticket> getTickets() {
        return rep.getTickets();
    }

    @PostMapping("/saveTicket")
    public void saveTicket(Ticket inTicket) {
        rep.saveTicket(inTicket);
    }

    @GetMapping("/removeTicket")
    public void removeTicket(int id) {
        rep.removeTicket(id);
    }

    @GetMapping("/slett")
    public void slett() {
        rep.slett();
    }
}
