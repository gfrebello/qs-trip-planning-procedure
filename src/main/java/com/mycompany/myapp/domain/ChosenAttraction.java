package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ChosenAttraction.
 */
@Entity
@Table(name = "chosen_attraction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ChosenAttraction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "is_reserved")
    private Boolean isReserved;

    @Column(name = "reservation_date")
    private Instant reservationDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Attraction attraction;

    @ManyToOne
    @JsonIgnoreProperties("chosenAttractions")
    private Trip trip;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsReserved() {
        return isReserved;
    }

    public ChosenAttraction isReserved(Boolean isReserved) {
        this.isReserved = isReserved;
        return this;
    }

    public void setIsReserved(Boolean isReserved) {
        this.isReserved = isReserved;
    }

    public Instant getReservationDate() {
        return reservationDate;
    }

    public ChosenAttraction reservationDate(Instant reservationDate) {
        this.reservationDate = reservationDate;
        return this;
    }

    public void setReservationDate(Instant reservationDate) {
        this.reservationDate = reservationDate;
    }

    public Attraction getAttraction() {
        return attraction;
    }

    public ChosenAttraction attraction(Attraction attraction) {
        this.attraction = attraction;
        return this;
    }

    public void setAttraction(Attraction attraction) {
        this.attraction = attraction;
    }

    public Trip getTrip() {
        return trip;
    }

    public ChosenAttraction trip(Trip trip) {
        this.trip = trip;
        return this;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ChosenAttraction chosenAttraction = (ChosenAttraction) o;
        if (chosenAttraction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chosenAttraction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChosenAttraction{" +
            "id=" + getId() +
            ", isReserved='" + isIsReserved() + "'" +
            ", reservationDate='" + getReservationDate() + "'" +
            "}";
    }
}
