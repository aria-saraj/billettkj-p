package ticket.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    public List<Ticket> getTickets() {
        String sql = "SELECT * FROM tickets ORDER BY ETTERNAVN";
        List<Ticket> tickets = db.query(sql, new BeanPropertyRowMapper(Ticket.class));
        return tickets;
    }

    public void saveTicket(Ticket inTicket) {
        String sql = "INSERT INTO tickets (film, antall, fornavn, etternavn, email, tlfnr) VALUES (?, ?, ?, ?, ?, ?)";
        db.update(sql, inTicket.getFilm(), inTicket.getAntall(), inTicket.getFornavn(), inTicket.getEtternavn(), inTicket.getEmail(), inTicket.getTlfnr());
    }

    public void removeTicket(int id) {
        String sql = "DELETE FROM tickets WHERE id = ?";
        db.update(sql, id);
    }

    public void slett() {
        String sql = "DELETE FROM tickets";
        db.update(sql);
    }
}