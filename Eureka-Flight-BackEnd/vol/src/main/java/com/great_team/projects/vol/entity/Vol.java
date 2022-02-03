package com.great_team.projects.vol.entity;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;


@Entity
@Table
public class Vol {
	@Id
	@GeneratedValue(generator = "ref_generator")
	@GenericGenerator(name="ref_generator", strategy = "com.great_team.projects.vol.util.VolRefGenerator")
	private String refVol;
	private String villeDepart;
	private String villeArrivee;
	private Date dateVol;
	private Time hDepart;
	private Time hArrivee;
	private Long numPilote;
	private Long numAvion;

	public String getRefVol() {
		return refVol;
	}

	public void setRefVol(String refVol) {
		this.refVol = refVol;
	}

	public String getVilleDepart() {
		return villeDepart;
	}

	public void setVilleDepart(String villeDepart) {
		this.villeDepart = villeDepart;
	}

	public String getVilleArrivee() {
		return villeArrivee;
	}

	public void setVilleArrivee(String villeArrivee) {
		this.villeArrivee = villeArrivee;
	}

	public Date getDateVol() {
		return dateVol;
	}

	public void setDateVol(Date dateVol) {
		this.dateVol = dateVol;
	}

	public Time gethDepart() {
		return hDepart;
	}

	public void sethDepart(Time hDepart) {
		this.hDepart = hDepart;
	}

	public Time gethArrivee() {
		return hArrivee;
	}

	public void sethArrivee(Time hArrivee) {
		this.hArrivee = hArrivee;
	}

	public Long getNumPilote() {
		return numPilote;
	}

	public void setNumPilote(Long numPilote) {
		this.numPilote = numPilote;
	}

	public Long getNumAvion() {
		return numAvion;
	}

	public void setNumAvion(Long numAvion) {
		this.numAvion = numAvion;
	}

	public Vol() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Vol {" + "refVol:" + refVol + ",villeDepart:" + villeDepart + ",villeArrivee:" + villeArrivee + ",dateVol:"
				+ dateVol + ",hDepart:" + hDepart + ",hArrivee:" + hArrivee + ",pilote:" + numPilote + ",avion:" + numAvion + "}";
	}

}
