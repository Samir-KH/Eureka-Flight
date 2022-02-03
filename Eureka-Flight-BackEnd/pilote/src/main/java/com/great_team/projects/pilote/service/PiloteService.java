package com.great_team.projects.pilote.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.great_team.projects.pilote.entity.Pilote;
import com.great_team.projects.pilote.repository.PiloteRepository;

@Service
public class PiloteService {
	
	PiloteRepository pilotePepository;
	
	@Autowired
	public PiloteService(PiloteRepository avionRepository) {
		this.pilotePepository = avionRepository;
	}
	
	public List<Pilote> getPiloteList(){
		return this.pilotePepository.findAll();
	}

	public Optional<Pilote> getPiloteById(Long id) {
		return this.pilotePepository.findById(id);
	}

	public String save(Pilote pilote) {
		pilote.setNumPilote(null);
		String name = pilote.getNomCompletPilote();
		String address = pilote.getAdressePilote();
		Date birthday = pilote.getDateNaissance();
		Float salary = pilote.getSalaire();
		if(name == null || address == null || birthday == null || salary == null ) {
			throw new IllegalStateException("les champs de l'entité pilote sont null");
		}
		if(name.equals("") || address.equals("")) {
			throw new IllegalStateException("les champs de l'entité pilote sont null");
		}
		Optional<Pilote> result = this.pilotePepository.getPilote(name,address, birthday, salary);
		if(result.isEmpty()) {
			this.pilotePepository.save(pilote);
			return "success";
		}
		else {
			throw new IllegalStateException("le pilote fournit existe déjà");
		}
	}
	public String upDate(Pilote pilote) {
		if(pilote.getNumPilote() == null ) {
			throw new IllegalStateException("absence de numero de pilote");
		}
		String name = pilote.getNomCompletPilote();
		String address = pilote.getAdressePilote();
		Date birthday = pilote.getDateNaissance();
		Float salary = pilote.getSalaire();
		if(name == null || address == null || birthday == null || salary == null ) {
			throw new IllegalStateException("les champs de l'entité pilote sont null");
		}
		if(name.equals("") || address.equals("")) {
			throw new IllegalStateException("les champs de l'entité pilote sont null");
		}
		ArrayList<Pilote> result = this.pilotePepository.getOtherPilote(name,address, birthday, salary, pilote.getNumPilote());
		if(result.isEmpty()) {
			this.pilotePepository.save(pilote);
			return "success";
		}
		else {
			throw new IllegalStateException("le pilote fournit existe déjà");
		}
	}
	public ArrayList<Pilote> getAvailabalePilote(){
		return this.pilotePepository.getAvailabalePilote();	
	}
	public String delete(Long id) {
		this.pilotePepository.deleteById(id);
		return "success";
	}
	public String getPiloteInfoById(Long id, String info) {
		// TODO Auto-generated method stub
		Optional<Pilote> result =  this.pilotePepository.findById(id) ;
		
		if(result.isEmpty())
			return "does not exist";
		else {
			if (info.equals("name")) {
				return result.get().getNomCompletPilote();
			}
			return "info tyepe does not exist";
		}
	}
}
